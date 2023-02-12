//banner
const bannerLabel = window.document.querySelector('#bannerLabel')
const span = window.document.querySelector('#imageBanner')
//pefil
const perfilLabel = window.document.querySelector('#label-imagePeril')
const spanPerfil = window.document.querySelector('#imagePerfil')
//pegar o id do user
const divIdUser = window.document.querySelector('.input')
var idUser = window.location.href
idUser = idUser.split('createChannel/')
idUser = idUser[1]

const div = window.document.querySelector('.infoChannel')

divIdUser.innerHTML=`<input id="idUser" name="idUser" type="text" value='${idUser}'/>
<input id="idUser" name="urlBanner" type="text" value='/logo-impusic.png'/>
<input id="idUser" name="urlImagePerfil" type="text" value='/logo-impusic.png'/>`

//bottom voltar
const divVoltar = window.document.querySelector('#voltar')
divVoltar.innerHTML=`<a href='/homeuserid/${idUser}' class="voltar">Voltar</a>`

bannerLabel.addEventListener('change', function(e){
    const input = e.target;
    const file = input.files[0]
    

    if(file){
        const reader = new FileReader();

        reader.addEventListener('load', function(e){
            const readerTarget = e.target;
            const img = document.createElement('img')
            img.className='imgBanner'
            img.src=readerTarget.result

            span.innerHTML=''
            span.appendChild(img)
           
            
        })

        reader.readAsDataURL(file)
    }else{
        span.innerHTML='Não foi escolhido uma imagem'
    }
})

perfilLabel.addEventListener('change', function(e){
    const input = e.target;
    const file = input.files[0]
    

    if(file){
        const reader = new FileReader();

        reader.addEventListener('load', function(e){
            const readerTarget = e.target;
            const img = document.createElement('img')
            img.className='imgBanner'
            img.src=readerTarget.result

            spanPerfil.innerHTML=''
            spanPerfil.appendChild(img)
            
        })

        reader.readAsDataURL(file)
    }else{
        spanPerfil.innerHTML='Não foi escolhido uma imagem'
    }
})
