import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DogsController {

    public async index ({ }: HttpContextContract) {
        return 'I am done'
      }
}
