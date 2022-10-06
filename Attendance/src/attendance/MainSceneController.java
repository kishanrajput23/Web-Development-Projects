/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package attendance;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;

/**
 * FXML Controller class
 *
 * @author Wipro
 */
public class MainSceneController implements Initializable {

    @FXML
    private BorderPane rootLayout;

    

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
         changeScene("ClassScene.fxml");
        
    }    

    @FXML
    private void setSTScene(ActionEvent event) {
        changeScene("STScene.fxml");
        
    }
    
    
    public  void changeScene(String scenePath){
        
        FXMLLoader loader;
        loader = new FXMLLoader(getClass().getResource(scenePath));
        AnchorPane pane = new AnchorPane();
           
    try{
            pane = (AnchorPane) loader.load();
            rootLayout.setCenter(pane);
        }
        catch(Exception e){

        }
     
    }

    @FXML
    private void setAttendanceScene(ActionEvent event) {
        changeScene("AttendanceScene.fxml");
    }
    
     @FXML
    private void setClassScene(ActionEvent event) {
        changeScene("ClassScene.fxml");
    }
    
}

