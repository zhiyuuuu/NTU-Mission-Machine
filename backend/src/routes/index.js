import taskRoute from "./task";
import userRoute from "./user";

const wrap = fn => ( ...args ) => fn( ...args ).catch( args[2] )

function main( app ) {
    app.post( '/login', wrap( userRoute.LoginByPassword ) )
    app.post( '/signup', wrap( userRoute.SignUp ) )
    app.post( '/', wrap( taskRoute.AddNewTask ) )
    app.get( '/tasks', wrap( taskRoute.GetAllTasks ) )
    app.post( '/tasks/content/<task_id>', wrap( taskRoute.GetDetailOfTasks ) )
    app.post( '/mytasks/<task_id>', wrap( taskRoute.GetMyTasks ) )
}
  
export default main