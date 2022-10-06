/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package attendance;

import DB.DBConnection;
import DB.DeleteDatabase;
import DB.QueryDatabase;
import Model.Students;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Label;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.util.Callback;

/**
 * FXML Controller class
 *
 * @author Wipro
 */
public class AttendanceSceneController implements Initializable {

    @FXML
    private TableView<Students> aTableView;
    @FXML
    private ComboBox<String> aClass;

    /**
     * Initializes the controller class.
     */
    
    
    ObservableList<String> classList = FXCollections.observableArrayList(); 
    @FXML
    private DatePicker aDate;
    @FXML
    private TextField aTeacher;
    @FXML
    private Button aSubmitBtn;
    @FXML
    private Label aStrength;
    @FXML
    private Label aPresent;
    @FXML
    private Label msg;
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
        
        // Build ClassName List for adding Students
         ResultSet rs = QueryDatabase.query("Select ClassName from ClassTable;");
        if(rs!=null){
            try {
                while(rs.next()){
                    classList.add(rs.getString(1));
                }
            } catch (SQLException ex) {
                Logger.getLogger(MainSceneController.class.getName()).log(Level.SEVERE, null, ex);
            }
        
        }
        
        aClass.setItems(classList);
        
        createTable();
    }    

    @FXML
    private void showStudents(ActionEvent event) {
        
        String cName = aClass.getValue();
        LocalDate date = aDate.getValue();
        
         msg.setText("");
        if(cName==null || cName.isEmpty()){
        aClass.requestFocus();
        return;
        }
        
        if(date==null){
        aDate.requestFocus();
        return;
        }
        
        buildTable(cName,date);
        
                

    }
    int strength =0;
    int presentCount = 0;
    ObservableList<Students> tableData = FXCollections.observableArrayList();  
    private void buildTable(String cName,LocalDate date) {
       tableData.clear();
       strength =0;
       presentCount = 0;
       boolean present=false;
        ResultSet rs = QueryDatabase.query("Select Roll_Number,Name,(Select present from ArecordTable where (Date='"+date+"' AND ClassName='"+cName+"' AND RollNumber=studentTable.Roll_Number))As Present from studenttable where CName='"+cName+"';");
        if(rs!=null){
            try {
                    while(rs.next()){
                        if(rs.getString(3)==null || rs.getString(3).equalsIgnoreCase("0")){
                         present=false;
                        }else{ 
                            present=true;
                            presentCount++;
                        }
                        strength++;
                        
                        tableData.add(new Students(rs.getString(1),rs.getString(2),present));
                        
                }   } catch (SQLException ex) {
                Logger.getLogger(AttendanceSceneController.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            aTableView.setItems(tableData);
        aTableView.refresh();
        aStrength.setText(String.valueOf(strength));
        aPresent.setText(String.valueOf(presentCount));
        }
    }
   
    private void createTable() {
        
           TableColumn<Students, String> col_id = new TableColumn("Roll No.");
                
                col_id.setCellValueFactory(new Callback<TableColumn.CellDataFeatures<Students, String>,
                        ObservableValue<String>>() {
                            public ObservableValue<String> call(TableColumn.CellDataFeatures<Students, String> t) {
                            
                                return new SimpleStringProperty(String.valueOf(t.getValue().getRollNum()));
                            }
                        });

                col_id.setPrefWidth(80);
                aTableView.getColumns().add(col_id);

                TableColumn<Students, String>  col_name = new TableColumn("Student Name");
               
                col_name.setCellValueFactory(new Callback<TableColumn.CellDataFeatures<Students, String>,
                        ObservableValue<String>>() {
                            public ObservableValue<String> call(TableColumn.CellDataFeatures<Students, String> t) {
                                return new SimpleStringProperty(t.getValue().getName());
                            }
                        });
                col_name.setPrefWidth(200);
                aTableView.getColumns().add(col_name);
               


                //Insert Button
                TableColumn<Students, Boolean> col_action = new TableColumn<>("Action");
                col_action.setSortable(false);

                col_action.setCellValueFactory(new Callback<TableColumn.CellDataFeatures<Students, Boolean>,
                                ObservableValue<Boolean>>() {

                                    @Override
                                    public ObservableValue<Boolean> call(TableColumn.CellDataFeatures<Students, Boolean> p) {
                                        return new SimpleBooleanProperty(p.getValue().isPresent());
                                    }
                                });

                col_action.setCellFactory(new Callback<TableColumn<Students, Boolean>, TableCell<Students, Boolean>>() {

                            @Override
                            public TableCell<Students, Boolean> call(TableColumn<Students, Boolean> p) {
                                return new CheckBoxCell(aTableView);
                            }

                        });

                col_action.setPrefWidth(60);

                aTableView.getColumns().add(col_action);
        
        
    }

    @FXML
    private void aSubmit(ActionEvent event) {
        
        String cName = aClass.getValue();
        LocalDate date = aDate.getValue();
        String teacher = aTeacher.getText();
       
        
        
        if(cName==null || cName.isEmpty()){
        aClass.requestFocus();
        return;
        }
        
        if(date==null){
        aDate.requestFocus();
        return;
        }
        
        if(teacher==null || teacher.isEmpty()){
        aTeacher.requestFocus();
        return;
        }
       
        try{
         Connection c;
            c = DBConnection.connect();
            
            ResultSet rs = QueryDatabase.query("Select Id from attendanceTable where date='"+date+"' AND ClassName='"+cName+"';");
            if(rs!=null){
                if(rs.next()){
                int id = Integer.parseInt(rs.getString(1));
                DeleteDatabase.deleteRecord(id, "AttendanceTable");
                }
            }
            
            
            String query = "insert into attendanceTable (Date,ClassName,TeacherId,TotalStrength,TotalPresent) values ('"+date+"','"+cName+"','"+teacher+"','"+strength+"','"+presentCount+"');";
            PreparedStatement  preparedStmt = c.prepareStatement(query,PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStmt.execute();
            ResultSet rs1=preparedStmt.getGeneratedKeys();
            rs1.next();
            int aId= Integer.parseInt(rs1.getString(1));
            
           
            String SQL = "insert into aRecordTable (AId,Date,StudentName,Present,RollNumber,ClassName) values (?,?,?,?,?,?)";
                     
                  preparedStmt = c.prepareStatement(SQL);
                   for(Students i: tableData){
                     
                       
                     preparedStmt.setInt(1, aId);
                     preparedStmt.setDate(2, java.sql.Date.valueOf(date));
                     preparedStmt.setString(3, i.getName());
                     preparedStmt.setBoolean(4, i.isPresent());
                     preparedStmt.setString(5, i.getRollNum());
                     preparedStmt.setString(6, cName);
                     preparedStmt.addBatch();
                }
                   preparedStmt.executeBatch();

           c.close();
           
            msg.setText("Attendance Sheet Updated Successfully.");
           
            
          
            
            
            
        } catch (SQLException ex) {
            Logger.getLogger(STSceneController.class.getName()).log(Level.SEVERE, null, ex);
        }
         
        
        
        
    }
    
    //Define the button cell
    private class CheckBoxCell extends TableCell<Students, Boolean> {
        final CheckBox cellCheckBox = new CheckBox();
         
        CheckBoxCell(final TableView tblView){
             
            cellCheckBox.setOnAction(new EventHandler<ActionEvent>(){
 
                @Override
                public void handle(ActionEvent t) {
                    int selectdIndex = getTableRow().getIndex();
                     if(cellCheckBox.isSelected()){
                     tableData.get(selectdIndex).setPresent(true);
                     presentCount++;
                     aPresent.setText(String.valueOf(presentCount));
                     }else{
                     tableData.get(selectdIndex).setPresent(false);
                     presentCount--;
                     aPresent.setText(String.valueOf(presentCount));
                     }
                }
            });
        }

       
 
        
        //Display button if the row is not empty
        @Override
        protected void updateItem(Boolean t, boolean empty) {
            super.updateItem(t, empty);
            if(!empty){
                cellCheckBox.setPrefSize(28, 20);
                setGraphic(cellCheckBox);
                if(t.booleanValue()){
                cellCheckBox.setSelected(true);
                }else{
                cellCheckBox.setSelected(false);
                }
            } else {
                 setGraphic(null);
                }
        }
    } 
      
    
}
