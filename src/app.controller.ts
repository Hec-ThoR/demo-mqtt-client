import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('MQTT_SERVICE') private client: ClientProxy,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('notifications')
   getNotifications(){
      return this.client.send('notification_channel', "It's a Message From Client")
  }
  @Get('process')
  getProcessClientData(){
      return this.client.send('process_channel', "Mohammad Yaser Ahmadi")
  }

  @Get('personas/create')
  registrar(){
    const string='{"nombre": "kathias", "primerApellido": "suarez","segundoApellido": "suarez"}';
    let json = JSON.parse(string);
    return this.client.send('personas/create', json)
  }

  @Get('personas/update')
  update(){
    const string= {
      nombre: 'milena',
      primerApellido: 'terruño',
      segundoApellido: 'trujillo',
      id: 20,
      createAt: '2023-02-09T16:01:30.721Z'
    };
    let json = string//JSON.parse(string);
    return this.client.send('personas/update', json)
  }

  @Get('personas/find/:id')
  get(@Param('id') id:number){
    
    return this.client.send('personas/find', id)
  }

  @Get('personas/all')
  getAll(){
    return this.client.send('personas/all', {})
  }

}
