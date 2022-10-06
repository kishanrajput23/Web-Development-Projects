/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package attendance;

import DB.DBConnection;
import DB.DisplayDatabase;
import java.net.URL;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;

/**
 * FXML Controller class
 *
 * @author Wipro
 */
public class STSceneController implements Initializable {

    @FXML
    private TableView<?> tTableView;
    @FXML
    private TextField tName;
    @FXML
    private Button addTeacherBtn;
    @FXML
    private TextField tSubject;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
         displayTeacher.buildData(tTableView, "Select * from TeacherTable Order By(TId) desc;");
           
    }    
    
    DisplayDatabase displayTeacher = new DisplayDatabase();

    @FXML
    private void addTeacher(ActionEvent event) {
        
        try {
            String name = tName.getText();
            String sub = tSubject.getText();
            
            if(name==null || name.isEmpty()){
                tName.requestFocus();
                tName.promptTextProperty().setValue("Enter Name");
                return;
            }
            
            if(sub==null || sub.isEmpty()){
                tSubject.requestFocus();
                return;
            }
            
            Connection c;
            c = DBConnection.connect();
            
            String query = "insert into teachertable (Name,subject) values ('"+name+"','"+sub+"');";
            c.createStatement().execute(query);
            c.close();
            
            tName.clear();
            tSubject.clear();
            
            displayTeacher.buildData(tTableView, "Select * from TeacherTable Order By(TId) desc;");
            
            
            
        } catch (SQLException ex) {
            Logger.getLogger(STSceneController.class.getName()).log(Level.SEVERE, null, ex);
        }
         
         
        
        
        
        
        
    }
    
}
