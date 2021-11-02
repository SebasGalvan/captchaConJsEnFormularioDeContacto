var claveHash = "";
cargarClave();

const actualizar = document.querySelector('#alcualizar_clave');
const enviar = document.querySelector('#enviar');

actualizar.addEventListener('click', cargarClave);
enviar.addEventListener('click', validar);

function validar(e) {
    e.preventDefault();



    const catcha = document.querySelector('#catcha');

    const valor = catcha.value

    if (valor === "") {   
        const errorCatcha = document.querySelector('#errorCatcha');
        errorCatcha.hidden = false;
        setTimeout(() => {
            errorCatcha.hidden = true;
            limpiarCaptcha(catcha);
            cargarClave();
        }, 5000);


    } else {
        
        const clave_enviada = hashear(valor.trim());

        if (clave_enviada === claveHash) {

            const errorCatcha = document.querySelector('#okCatchaOk');
            errorCatcha.hidden = false;
            setTimeout(() => {
                errorCatcha.hidden = true;
                limpiarCaptcha(catcha);
                cargarClave();
            }, 5000);

        }else{

            const errorCatcha = document.querySelector('#errorCatchaIngresoErroneo');
            errorCatcha.hidden = false;
            setTimeout(() => {
                errorCatcha.hidden = true;
                limpiarCaptcha(catcha);
                cargarClave();
            }, 5000);

        }
    }
}

function limpiarCaptcha(captcha){
    captcha.value = ""; 

}

// --------------------------------------------------------------------------------------------

//Funcion para generar la clave ...
// Esto se haria del lado del servidor y lo enviaria via http 
//Aca lo simulamos 
// num ---> Es la longitud de la clave que queremos generar...
function generarClaveAleatoria(num){
    //Caracteres para generar aleatoriamente la clave
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let clave= ' ';

    const charactersLength = characters.length;

    for ( let i = 0; i < num; i++ ) {
        clave += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // devolvemos la clave generada
    return clave;
}


//Funcion para mostrar la clave en la pantalla
function cargarClave(){

    // Seleciona el canvas ...
    const canvas = document.querySelector('#canvas_capcha');

            if (canvas && canvas.getContext) {
            var ctx = canvas.getContext("2d");
            limpair_canvas(ctx, canvas);

                if (ctx) {
                            var x = canvas.width/2;
                            ctx.beginPath();
                            ctx.moveTo(x, 0);
                            ctx.width = 150;
                            ctx.stroke();
                            ctx.textAlign = '';
                            
                            ctx.font="25px Verdana";
                            ctx.fillStyle = "black";
                            mi_clave = generarClaveAleatoria(6);

                            

                            // Para que la clave no se pueda copiar y pegar directamente la encriptamos --> En este caso uso uno muy basico, lo ideal seria usar una libreria como bcrypt en node... 
                            claveHash = hashear(mi_clave.trim());

                            //Lo dibujo en el canvas 
                            ctx.fillText(mi_clave,0,25);
                            //Reseteo la clave para que no pueda ser accedida
                            mi_clave = " ";
                            
                        }
            }
}

//Reset del campo canvas
function limpair_canvas(context, canvas){
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}



//Funcion para encriptar la clave
function hashear(str,seed = 0){
    
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);


        return 4294967296 * (2097151 & h2) + (h1>>>0);
};
