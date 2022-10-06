/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package attendance;

import DB.DBConnection;
import DB.DeleteDatabase;
import DB.DisplayDatabase;
import DB.QueryDatabase;
import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;

/**
 * FXML Controller class
 *
 * @author Wipro
 */
public class ClassSceneController implements Initializable {

    @FXML
    private TextField cName;
    @FXML
    private ComboBox<String> cTeacher;
    @FXML
    private Button addClassBtn;
    @FXML
    private TableView<?> cTableView;

    /**
     * Initializes the controller class.
     */
    
    DisplayDatabase displayClass = new  DisplayDatabase();
    DisplayDatabase displayStudent = new  DisplayDatabase();
    
     ObservableList<String> teacherList = FXCollections.observableArrayList();  
     ObservableList<String> genderList = FXCollections.observableArrayList();  
     ObservableList<String> classList = FXCollections.observableArrayList(); 
     
    @FXML
    private TextField sName;
    @FXML
    private TextField sRNum;
    @FXML
    private ComboBox<String> sClass;
    @FXML
    private ComboBox<String> sGender;
    @FXML
    private Button addStudentBtn;
    @FXML
    private TableView<?> sTableView;
      
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
        displayClass.buildData(cTableView, "Select * from ClassTable Order By(Id) desc;");
               
        ResultSet rs = QueryDatabase.query("Select Name from TeacherTable;");
        if(rs!=null){
            try {
                while(rs.next()){
                    teacherList.add(rs.getString(1));
                }
            } catch (SQLException ex) {
                Logger.getLogger(MainSceneController.class.getName()).log(Level.SEVERE, null, ex);
            }
        
        }
        
        cTeacher.setItems(teacherList);
        
        // Build ClassName List for adding students
         rs = QueryDatabase.query("Select ClassName from ClassTable;");
        if(rs!=null){
            try {
                while(rs.next()){
                    classList.add(rs.getString(1));
                }
            } catch (SQLException ex) {
                Logger.getLogger(MainSceneController.class.getName()).log(Level.SEVERE, null, ex);
            }
        
        }
        
        sClass.setItems(classList);
        
        //Create genderList
        genderList.add("F");
        genderList.add("M");
        genderList.add("O");
        sGender.setItems(genderList);
    }    

    
    
    @FXML
    private void addClass(ActionEvent event) {
        
          try {
            String name = cName.getText();
            String teacher = cTeacher.getValue();
            
            if(name==null || name.isEmpty()){
                cName.requestFocus();
                cName.promptTextProperty().setValue("Enter Name");
                return;
            }
            
            if(teacher==null || teacher.isEmpty()){
                cTeacher.requestFocus();
                return;
            }
            
            Connection c;
            c = DBConnection.connect();
            
            String query = "insert into Classtable (ClassName,Teacher) values ('"+name+"','"+teacher+"');";
            c.createStatement().execute(query);
            c.close();
            
            cName.clear();
            cTeacher.setValue("");
            
            displayClass.buildData(cTableView, "Select * from ClassTable Order By(Id) desc;");
            
            classList.add(name);
            
        } catch (SQLException ex) {
            Logger.getLogger(STSceneController.class.getName()).log(Level.SEVERE, null, ex);
        }
         
         
        
        
        
        
    }

    @FXML
    private void showStudents(ActionEvent event) {
        String cname = sClass.getValue();
        if(cname!=null && !cname.isEmpty()){
        displayStudent.buildData(sTableView, "Select * from StudentTable where CName='"+cname+"' Order By(Id) desc;");
        }
        
    }
        String cname = "";
        String name = "";
        String gender = "";
        String rNum = "";
    @FXML
    private void addStudent(ActionEvent event) {
        String cname = sClass.getValue();
        String name = sName.getText();
        String gender = sGender.getValue();
        String rNum = sRNum.getText();
        
        if(cname==null || cname.isEmpty()){
                sClass.requestFocus();
                return;
            }
            
        if(name==null || name.isEmpty()){
                sName.requestFocus();
                return;
            }
            
        if(gender==null || gender.isEmpty()){
                sGender.requestFocus();
                return;
            }
            
        if(rNum==null || rNum.isEmpty()){
                sRNum.requestFocus();
                return;
            }
            
        Connection c;
         try{
             c = DBConnection.connect();
            
            String query = "insert into Studenttable (Roll_Number,Name,Gender,CName) values ('"+rNum+"','"+name+"','"+gender+"','"+cname+"');";
            c.createStatement().execute(query);
            c.close();
            
            sName.clear();
            sRNum.clear();
            
            displayStudent.buildData(sTableView, "Select * from StudentTable where CName='"+cname+"' Order By(Id) desc;");
            
        } catch (SQLException ex) {
            Logger.getLogger(STSceneController.class.getName()).log(Level.SEVERE, null, ex);
        }
         
        
    }

    @FXML
    private void mDeleteClass(ActionEvent event) {
        
        int index = cTableView.getSelectionModel().getSelectedIndex();
        ObservableList<ObservableList> data = displayClass.getData();
         ObservableList<String> itemsList = data.get(index);
         DeleteDatabase.deleteRecord(Integer.parseInt(itemsList.get(0)), "ClassTable");
            displayClass.buildData(cTableView, "Select * from ClassTable Order By(Id) desc;");
    }

    @FXML
    private void mDeleteStudent(ActionEvent event) {
         int index = sTableView.getSelectionModel().getSelectedIndex();
        ObservableList<ObservableList> data = displayStudent.getData();
         ObservableList<String> itemsList = data.get(index);
         DeleteDatabase.deleteRecord(Integer.parseInt(itemsList.get(0)), "StudentTable");
 
         displayStudent.buildData(sTableView, "Select * from StudentTable where CName='"+cname+"' Order By(Id) desc;");
 
    }
    
}
