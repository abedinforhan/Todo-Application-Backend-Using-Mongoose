const jwt=require('jsonwebtoken')

const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
   const token=authorization.split(' ')[1];
   const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)

   const {username,name}=decoded;
   req.username=username;
   next();
  } catch (error) {
    console.log(error);
    next('Authentication Failed !')
  }
    
};

module.exports = checkLogin;
