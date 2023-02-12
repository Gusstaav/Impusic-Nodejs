
var iduser = window.location.href;
iduser = iduser.split('/')
iduser = iduser[3]

var urlAnteriorId = window.document.referrer
urlAnteriorId = urlAnteriorId.split('/')
urlAnteriorId = urlAnteriorId[4]

const voltar = window.document.querySelector('#voltar')
voltar.innerHTML=`<a href='/homeuserid/${urlAnteriorId}' class="voltar">Voltar</a>`



async function getChannelUser(){
    const getChannel = fetch('/getchannel/'+iduser)
    .then((dados) => dados.json())
    .then((datas) => {
    datas.map((elements) => getVideosChannel(elements))
})
}

getChannelUser()

const idChannel = iduser

async function getVideosChannel(elements){
   
    const getVideos = await fetch('/getVideos/channel/'+elements.iduser)
    .then((dados) => dados.json())
    .then((datas) => {
        Channel(elements, datas)
    })
}


function Channel(elements, datas){
    const dataChannel = elements
    const dataVideos = datas
   
    
    //container
    var NewContainer = window.document.createElement('div')
    NewContainer.className='container'
    NewContainer.appendChild(voltar)

    
    
    //banner

    if(!dataChannel.urlbanner){
        const banner = window.document.createElement('img')
        banner.className='banner'
        banner.src='/logo-impusic.png'
        NewContainer.appendChild(banner)
    }else{
        const banner = window.document.createElement('img')
        banner.className='banner'
        banner.src=dataChannel.urlbanner
        NewContainer.appendChild(banner)
    }

    //foto perfil

   if(!dataChannel.urlimageperfil){
    var imagePerfil = window.document.createElement('img')
    imagePerfil.className='fotoPerfil'
    imagePerfil.src='/logo-impusic.png'
    NewContainer.appendChild(imagePerfil)
   }else{
    var imagePerfil = window.document.createElement('img')
    imagePerfil.className='fotoPerfil'
    imagePerfil.src=dataChannel.urlimageperfil
    NewContainer.appendChild(imagePerfil)
   }


    //informações do canal
    var infoChannel =  window.document.createElement('div')
    infoChannel.className='infoChannel'

    var nameChannel =  window.document.createElement('p')
    nameChannel.className='name'
    nameChannel.innerText=dataChannel.name

    var descriptionChannel =  window.document.createElement('p')
    descriptionChannel.className='description'
    descriptionChannel.innerText=dataChannel.description

    infoChannel.appendChild(nameChannel)
    infoChannel.appendChild(descriptionChannel)
    
    // grid videos
    
    var gridVideos =  window.document.createElement('div')
    gridVideos.className='videos'
    
    for(var i of dataVideos){
        const result = dataVideos
        var video = window.document.createElement('img')
        video.className='thumbnail'
        video.src=i.urlcapa
       
        var titleVideo = window.document.createElement('p')
        titleVideo.className='title'
        titleVideo.innerText=i.title

        
        var linkVideo =  window.document.createElement('a')
        linkVideo.className="linkVideo"

        linkVideo.appendChild(video)
        linkVideo.appendChild(titleVideo)
        gridVideos.appendChild(linkVideo)
    }
    




    
    NewContainer.appendChild(infoChannel)
    NewContainer.appendChild(gridVideos)
    
    var container0 = window.document.querySelector('.container0')
    window.document.body.insertBefore(NewContainer, container0)

    console.log(window.document.body)
    
}
