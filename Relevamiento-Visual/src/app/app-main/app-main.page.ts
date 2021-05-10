import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirestoreService } from '../services/firestore.service';



@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.page.html',
  styleUrls: ['./app-main.page.scss'],
})
export class AppMainPage implements OnInit {

  currentUser: any = { "galery": "cosasLindas" }

  ////Lista de imagenes
  listaDeImagenes: any = [];
  listaDeImagenesFiltradasPorTipo: any = [];
  listaDeImagenesFiltradasPorUsuario: any = [];

  imagen: string;
  nombreDeImagen;

  pathDeImagen: any;
  storageRef = this.AngularFireStorage.storage.ref();

  ///
  mostrarImagenesDelIngresado = false;
  //cambiar
  @Input() imgSeleccionada;


  ///Votaciones
  listaDeVotaciones = [];
  showFullImg: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private camara: Camera,
    private AngularFireStorage: AngularFireStorage,
    private fireService: FirestoreService,
    private toast: ToastController

  ) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;
    this.TraerImagenesEnLista();

    console.log(this.currentUser);
  }

  deseleccionarImagen() {
    this.imgSeleccionada = "";
  }

  ///Configuracion para tomar una foto
  TomarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }

    this.camara.getPicture(options).then((imageData) => {
      //this.spinner = true;
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      window.alert(this.imagen);
      //this.componerNombreDeImagen();
      //this.subirFotoAFire();
      this.fireService.create('votaciones', { 'imagen': this.nombreDeImagen, 'votos': [] });
    }, (err) => {
      this.presentToast(err, 2000, 'danger', 'ERROR');
    });
  }

  async presentToast(mensaje: string, duracion: number, color: string, titulo: string, boton?: boolean,
    tituloBotonUno?: string, tituloBotonDos?: string, urlUno?: string, urlDos?: string) {
    let toast;
    if (boton) {
      toast = await this.toast.create({
        message: mensaje,
        duration: duracion,
        color: color,
        header: titulo,
        buttons: [
          {
            side: "end",
            text: tituloBotonUno,
            handler: () => {
              this.router.navigateByUrl("/" + urlUno);
            }
          },
          {
            side: "end",
            text: tituloBotonDos,
            handler: () => {
              this.router.navigateByUrl("/" + urlDos);
            }
          }
        ]
      });
    }
    else {
      toast = await this.toast.create({
        message: mensaje,
        duration: duracion,
        color: color,
        header: titulo
      });
    }
    toast.present();
  }

  ///Obtener lista de imagenes
  TraerImagenesEnLista() {
    let auxLista = [];
    //this.spinner = true;
    this.AngularFireStorage.storage.ref().listAll().then((lista) => {
      lista.items.forEach(item => {
        item.getDownloadURL().then((linkImagen) => {
          let archivo = this.ObtenerLink(item.name, linkImagen);
          auxLista.push(archivo);
        });
      });
      setTimeout(() => {
        this.listaDeImagenes = auxLista;
        //this.spinner = false;
        this.filtrarPorTipo(this.currentUser.galery);
        this.filtrarPorUsuario(this.currentUser.email);
      }, 3000);
    });
  }

  ObtenerLink(nombreImagen: string, link: string) {

  }


  ///Filtro la lista por lindas o feas
  filtrarPorTipo(tipo: string) {
    this.listaDeImagenesFiltradasPorTipo = [];
    this.listaDeImagenes.forEach(archivo => {
      if (archivo.tipo == tipo) {
        this.listaDeImagenesFiltradasPorTipo.push(archivo);
      }
      else if (tipo == 'todas') {
        this.listaDeImagenesFiltradasPorTipo.push(archivo);
      }
    });
    //this.ordenarPorFecha(this.listaFiltrada);
  }

  ///Filtro la lista por usuario ingresado
  filtrarPorUsuario(usuario: string) {
    this.listaDeImagenesFiltradasPorUsuario = [];
    this.listaDeImagenes.forEach(element => {
      if (element.usuario == usuario) {
        this.listaDeImagenesFiltradasPorUsuario.push(element);
      }
    });
    //this.ordenarPorFecha(this.listaDeImagenesPropias);
  }


  ///Datos de la foto
  mostrarInfo(archivo){
    archivo.votos = 0;
    this.imgSeleccionada = archivo;
    this.calcularVotacion(archivo);
  }


  ////VOTACION
  agregarVotacion(imagen: any, calificacion){
    imagen.votos.push({ 'usuario': this.currentUser.email, 'voto': calificacion});
    this.fireService.ToUpdate('votaciones',imagen.id,imagen);
    this.leerTodasLasVotaciones();
    this.calcularVotacion(this.imgSeleccionada);
  }

  votarFotografia(calificacion, fotografia){
    let yaVoto = false;
    let imgExiste = false;
    let auxVotacion;
    this.listaDeVotaciones.forEach(votacion=>{
      if(fotografia.imgName == votacion.imagen){
        imgExiste = true;
        auxVotacion - votacion;
      }
    });
    if(imgExiste && auxVotacion){
      auxVotacion.votos.forEach(voto => {
        voto.usuario == this.currentUser.email ? yaVoto = true: null;
      });
      if(!yaVoto){
        this.agregarVotacion(auxVotacion,calificacion);
        this.presentToast('Gracias por votar',2000,'success','Listo');
      }
      else{
        this.presentToast('Ya voto esta foto',2000,'warning','OK');
      }
    }
  }

  calcularVotacion(archivo){
    this.listaDeVotaciones.forEach(votacion => {
      if(votacion.imagen == archivo.imgName){
        this.fireService.getById(votacion.id).subscribe((res : any) =>{
          let cantVotos = 0;
          res.payload.data().votos.forEach(element => {
            element.voto == 'like' ? cantVotos++ : cantVotos;
          });
          this.imgSeleccionada.votos = cantVotos;
        });
      }
    });
  }

  leerTodasLasVotaciones() {
    this.fireService.getAll('votaciones').subscribe((imagenesSnapShot) => {
      imagenesSnapShot.forEach((response: any) => {
        let imageDate = response.payload.doc.data();
        imageDate['id'] = response.payload.doc.id;
        this.listaDeVotaciones.push(imageDate);
      });
    })
  }


  toggleFullImg() {
    this.showFullImg ? this.showFullImg = false : this.showFullImg = true;
  }
}
