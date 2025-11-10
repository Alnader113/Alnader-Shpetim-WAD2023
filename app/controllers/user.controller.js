exports.login = async (req, res) => {

 try{
     const {username, password} = req.body;

     if(!username || !password){
        return res.status(400).json({message: "Benutzername und Passwort erforderlich"})
     }

     const db = req.app.locals.db;

     const user = await db.collection('User-Collection').findOne({username: username});

     if(!user){
        return res.status(401).json({message: "ungültige Benutzername oder Passwort"})
     }

     if( user.password === password){
        const {password: _, ...safeUser} = user;
        res.status(200).json(safeUser);
     }else{
        res.status(401).json({message: "ungültige Benutzername oder Passwort"});
     }

    } catch (error){
      console.error('Fehler beim Login:', error);
      res.status(500).json({message: "Server-Fehler beim Login"})
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.collection('User-Collection').find({}).toArray();
        
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.status(200).json(usersWithoutPasswords);
    } catch (error) {
        console.error('Fehler beim Abrufen der User:', error);
        res.status(500).json({ message: 'Server-Fehler beim Abrufen der User' });
    }
}


