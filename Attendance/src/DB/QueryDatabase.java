/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author tanzeem
 */
public class QueryDatabase {
    
   static ResultSet rs;
    
    public static ResultSet query(String q){
        try {
            Connection c = DBConnection.connect();
            rs = c.createStatement().executeQuery(q);
            
            
        } catch (SQLException ex) {
            Logger.getLogger(QueryDatabase.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return rs;
    } 
    
    
}
