import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
import Mongoose from 'mongoose'

export default class MongoProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
  
      Mongoose.connection.once('open',function(){
          console.log("hello bangladesh");
      }).on('error',function(error){
          console.log("error ello bangladesh",error);
      })
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    await Mongoose.connection.close()
    console.log("closing")
    // Cleanup, since app is going down
  }
}
