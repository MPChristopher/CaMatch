import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  entradas: any[] = [];

  constructor(private alertController: AlertController) {}

  async crearNuevaEntrada() {
    const foto = await this.tomarFoto();
    if (foto) {
      const titulo = prompt('Ingrese un título para la entrada:');
      const descripcion = prompt('Ingrese una descripción para la entrada:');

      const nuevaEntrada = { foto, titulo, descripcion };
      
      this.entradas.push(nuevaEntrada);
    }
  }

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if (foto && foto.webPath) {
      return foto.webPath;
    } else {
      return null;
    }
  }

  async eliminarEntrada(entrada: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta publicacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const index = this.entradas.indexOf(entrada);
            if (index !== -1) {
              this.entradas.splice(index, 1);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}