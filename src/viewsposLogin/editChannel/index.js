const bannerLabel = window.document.querySelector('#bannerLabel')
const span = window.document.querySelector('#imageBanner')

const perfilLabel = window.document.querySelector('#label-imagePeril')
const spanPerfil = window.document.querySelector('#imagePerfil')

var iduser = window.location.href
iduser = iduser.split('/')
iduser = iduser[4]
const divVoltar = window.document.querySelector('#voltar')
divVoltar.innerHTML=`<a href='/homeuserid/${iduser}' class="voltar">Voltar</a>`


var idChannel = window.location.href
idChannel = idChannel.split('/')
idChannel = idChannel[5]
const divInput = window.document.querySelector('#input')
divInput.innerHTML=`<input name='idchannel' id='idchannel' type='text' value='${idChannel}'>
<input name='iduser' id='idchannel' type='text' value='${iduser}'>`


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
            img.className='imgPerfil'
            img.src=readerTarget.result

            spanPerfil.innerHTML=''
            spanPerfil.appendChild(img)
            
        })

        reader.readAsDataURL(file)
    }else{
        spanPerfil.innerHTML='Não foi escolhido uma imagem'
    }
})

