import express,{Request,Response, response} from "express"
import { DatabaseService } from "./dbcommerce";
import bodyParser from "body-parser";
import cors from "cors";
import { User } from "./services/user";
import { Login } from "./services/Login";

//declaration du service degestion de la base de donnee
    
    let dbcommerce=new DatabaseService();

    const app=express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
        //c'est indispensable d'utiliser le middleware "cors" de express car il permet de partager les donnees entre 2 domaibes diffrents(2 serveurs de 2 ports different) !!!

    app.get('/',(req:Request,resp:Response)=>{
        resp.send('app works !');
    });
        
    app.post('/signup',bodyParser.json(),(req:Request,resp:Response)=>{
            
        let user:User;
        resp.json(req.body);
        user=req.body;
        dbcommerce.addUser(user);
        console.log(user);
        resp.send("signup cote serveur works !");

    });

    app.post('/signin',bodyParser.json(),(req:Request,resp:Response)=>{
        let login:Login;
        //req.json(req.body);
        login=req.body;
        let con=dbcommerce.connectToDatabase();
        let query="select * from utilisateur where username='"+login.username+"' and password='"+login.password+"'";
        console.log("affichage du login:\n");
        
        console.log(login);

    con.query(query, function (err:any, result:any, fields:any) {
      if (err) throw err;
      else{
        console.log(result);
        resp.send(result);
        //console.log(json(result));
      }
   });

    });

    app.listen(8888,()=>{
    console.log("server started !");
    });

    /*//var resultat=dbcommerce.search(login);
        //console.log("l'objet retournee est:(())\n"+resultat);
//var result=dbcommerce.search(login);
        //resp.send(dbcommerce.search(login));
        //console.log(resultat);
        
//cette fonction retourne l'utilisateur a partir de sin login:username et password
        
       //resp.send(JSON.resultat.stringify()); */