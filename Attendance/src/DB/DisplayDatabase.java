/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB;

/***** DisplayDatabase.java *****/  
   
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
 import java.sql.Connection;  
 import java.sql.ResultSet;  
 import javafx.beans.property.SimpleStringProperty;  
 import javafx.beans.value.ObservableValue;  
 import javafx.collections.FXCollections;  
 import javafx.collections.ObservableList;  
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.TableCell;
 import javafx.scene.control.TableColumn;  
 import javafx.scene.control.TableColumn.CellDataFeatures;  
 import javafx.scene.control.TableView;  
 import javafx.util.Callback;  
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.Background;
import javafx.scene.paint.Color;

  




public class DisplayDatabase{  

    public ObservableList<ObservableList> getData() {
        return data;
    }
   //Tableview and data  
   private  ObservableList<ObservableList> data;  
   
  
   
   
   //Connection database  
   public  void buildData(TableView tableview,String SQL){  
       if(!tableview.getColumns().isEmpty())
       tableview.getColumns().clear();
      Connection c ;  
        data = FXCollections.observableArrayList();
      //  data.clear();
      //  data.removeAll(data);
       
      try{  
       c = DBConnection.connect();  
     //  String SQL = "SELECT * from " + tableName;  
       //ResultSet  
       ResultSet rs = c.createStatement().executeQuery(SQL);  
      
       /**********************************  
        * TABLE COLUMN ADDED DYNAMICALLY *  
        **********************************/  
       
       for(int i=0 ; i<rs.getMetaData().getColumnCount(); i++){  
         //We are using non property style for making dynamic table  
         final int j = i;          
         TableColumn col = new TableColumn(rs.getMetaData().getColumnName(i+1));  
       
         col.setCellValueFactory(new Callback<CellDataFeatures<ObservableList,String>,ObservableValue<String>>(){            
           public ObservableValue<String> call(CellDataFeatures<ObservableList, String> param) {                                                 
             return new SimpleStringProperty(param.getValue().get(j).toString());              
           }            
         });  
         
         
         // Add all columns to tableview
        
            tableview.getColumns().addAll(col); 
        
         
       }  
     
       /********************************  
        * Data added to ObservableList *  
        ********************************/  
       
       while(rs.next()){  
         //Iterate Row  
         ObservableList<String> row = FXCollections.observableArrayList();  
         for(int i=1 ; i<=rs.getMetaData().getColumnCount(); i++){  
           //Iterate Column  
          
           row.add(rs.getString(i));  
           
         }  
         
         //System.out.println("Row [1] added "+row );  
         data.add(row);  
         
        }  
       //FINALLY ADDED TO TableView  
         tableview.setItems(data);
         
       
      }catch(Exception e){  
        System.out.println("Error on Building Data");        
      }  
    }  
   
    
}