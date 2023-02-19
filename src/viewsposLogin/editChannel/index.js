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


async function ImgBannerAnterior(){
    const getChannel = await fetch('/getchannel/'+iduser)
    const datas = await getChannel.json();


    const imgBanner = await document.createElement('img')
    imgBanner.className='imgBanner'
    imgBanner.src=datas[0].urlbanner

   
    span.appendChild(imgBanner)
    
}

ImgBannerAnterior()

async function ImgPerfilAnterior(){
    const getChannel = await fetch('/getchannel/'+iduser)
    const datas = await getChannel.json();


    const imgPerfil = await document.createElement('img')
    imgPerfil.className='imgPerfil'
    imgPerfil.src=datas[0].urlimageperfil

    
    spanPerfil.appendChild(imgPerfil)
}

ImgPerfilAnterior()



bannerLabel.addEventListener('change', async function(e){
    const input = e.target;
    const file = input.files[0]
    console.log(e)
    
    if(file){
        const reader = new FileReader();

        reader.addEventListener('load', function(e){
            const readerTarget = e.target;
            const imgPrewiew = document.createElement('img')
            imgPrewiew.className='imgBanner'
            imgPrewiew.src=readerTarget.result

            span.innerHTML=''
            span.appendChild(imgPrewiew)
            
            
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

