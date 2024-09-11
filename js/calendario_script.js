
/*Añadir año, mes y btn siguiente-anterior */
const fechaActual = document.querySelector(".fecha-actual"),
diasTag = document.querySelector(".dias"),
antSigIcono = document.querySelectorAll(".iconos span"),

/*Añadir event listner a cada dia */
selectorHoras= document.getElementById('selector-contenedor'),
diasBtn=document.querySelectorAll(".dias"),

/*btns selctor de horas */
horasBtn = document.getElementById('btn-ace-contenedor'),
selectorHorasBtn= document.querySelectorAll(".horas"),
cerrarIcono = document.getElementById('cerrar-selector'),
horaRegistrada = document.getElementById('hora-registrada'),

/*Añadir event listner a los btns si y no */
noHoraBtn = document.getElementById('no-hora-btn'),
siHoraBtn=document.getElementById('si-hora-btn');





/*crear calendario con año mes y dia correcto*/
let fecha = new Date(),
añoActual = fecha.getFullYear(),
mesActual = fecha.getMonth();
const meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const renderCalendario =() => {
    let ultimoNumerodelMes = new Date(añoActual, mesActual + 1, 0).getDate(),
    primerDiadelMes = new Date(añoActual, mesActual, 1).getDay(),
    ultimoDiaMesPasado = new Date(añoActual, mesActual, 0).getDate(),
    ultimoDiaMes= new Date(añoActual, mesActual, ultimoNumerodelMes).getDay();
    let liTag = "";

    for (let i = primerDiadelMes; i > 0; i--) {
        liTag += `<li class="otro-mes">${ultimoDiaMesPasado - i + 1}</li>`;
    }

    for (let i = 1; i <= ultimoNumerodelMes; i++) {
        liTag += `<li>${i}</li>`;
    }

    for (let i = ultimoDiaMes; i < 6; i++) {
        liTag += `<li class="otro-mes">${i - ultimoDiaMes+ 1}</li>`;
    }

    fechaActual.innerText = `${meses[mesActual]} ${añoActual}`;
    diasTag.innerHTML= liTag;
}
renderCalendario();



/*agregar funcionalidad a btns adelante y atras del calendario*/
antSigIcono.forEach(icono =>{
    icono.addEventListener("click", () => {
        mesActual = icono.id === "anterior" ? mesActual - 1 : mesActual + 1;

        if(mesActual < 0 || mesActual > 11){
            fecha = new Date(añoActual,mesActual);
            añoActual = fecha.getFullYear();
            mesActual = fecha.getMonth();
        }else{
            fecha = new Date();
        }
        renderCalendario();
    })
})


/*btns para cada dia */
diasBtn.forEach(dia =>{
    dia.addEventListener("click",()=>{
        selectorHoras.classList.add('mostrar');
    })
})


/*btns selector de hora */
selectorHorasBtn.forEach(hora => {
    hora.addEventListener("click",()=>{
        horasBtn.classList.add('mostrar-btns');
    })
})
cerrarIcono.onclick=()=>{
    selectorHoras.classList.remove('mostrar')
}


/*Añadir event listner a los btns si y no */
noHoraBtn.onclick =() =>{
    horasBtn.classList.remove('mostrar-btns');
}
siHoraBtn.onclick=()=>{
    horasBtn.classList.remove('mostrar-btns');
    horaRegistrada.classList.add('visible');
    setTimeout(()=>{
        horaRegistrada.classList.remove('visible');
        selectorHoras.classList.remove('mostrar');
        window.location.href ="inicio_cliente.html"
    },1000);
}
