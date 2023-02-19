async function GetDataVideo(){
    var idvideo = window.location.href
    idvideo = idvideo.split('=')
    idvideo = idvideo[1]
    
    const datasVideos = fetch('getVideoWachScreen?idvideo='+idvideo)
    .then((response) => response.json())
    .then((data) => {
        data.map((elementsVideo => GetChannelVideo(elementsVideo)))
        
    } )
}

GetDataVideo()

async function GetChannelVideo(elementsVideo){
    const getChannel = await fetch('getChannelWachScreen?idchannel='+elementsVideo.idchannel)
    .then((response) => response.json())
    .then((datasChannel) => {
        DataVideo(datasChannel, elementsVideo)
    })
}

async function DataVideo(datasChannel, elementsVideo){
    //criando container de video
    var containerVideo = window.document.createElement('div')
    containerVideo.className='containerVideo'
    //video
    var video = window.document.createElement('video')
    video.className='video'
    video.controls=true
    video.autoplay=true
    
    var sourceVideo = window.document.createElement('source')
    sourceVideo.src=elementsVideo.urlvideo
    
    video.appendChild(sourceVideo)
    //title video
    var titleVideo = window.document.createElement('p')
    titleVideo.className='title'
    titleVideo.innerText=elementsVideo.title

    //descrição
    var divDescription = window.document.createElement('div')
    divDescription.className='containerDescripiton'
    divDescription.dataset=true

    var description = window.document.createElement('p')
    description.className='videoDescription'
    description.innerText=elementsVideo.description

    var bottomLeiaMais = window.document.createElement('button')
    bottomLeiaMais.innerHTML='Leia mais'
    bottomLeiaMais.className='bottomLeiaMais'

    var bottomLeiaMenos = window.document.createElement('button')
    bottomLeiaMenos.innerHTML="Leia menos"
    bottomLeiaMenos.className='bottomLeiaMenos'
    

    //function
   bottomLeiaMais.addEventListener('click', async function(e){
    e.preventDefault();
        var description = window.document.querySelector('.videoDescription')
        var bottomLeiaMais = window.document.querySelector('.bottomLeiaMais')
        var divDescription = window.document.querySelector('.containerDescripiton')
        var quant = description.scrollHeight

            if(description.scrollHeight > 1){
                divDescription.style.height=quant+"px"
                bottomLeiaMais.style.display='none'
                bottomLeiaMenos.style.display="block"
                    
                    bottomLeiaMenos.addEventListener('click', function(e){
                            e.preventDefault();
                                var description = window.document.querySelector('.videoDescription')
                                var bottomLeiaMais = window.document.querySelector('.bottomLeiaMais')
                                var divDescription = window.document.querySelector('.containerDescripiton')

                                    if(description){
                                        bottomLeiaMais.style.display='block'
                                        bottomLeiaMenos.style.display="none"
                                        divDescription.style.height="40px"
                                    }
                                })
            }else{
                divDescription.style.height="40px"
            }
   })
   

    divDescription.appendChild(description)
    divDescription.appendChild(bottomLeiaMais)
    divDescription.appendChild(bottomLeiaMenos)
    console.log(divDescription)
    //div com as informções do canal
    var containerInfoChannel = window.document.createElement('div')
    containerInfoChannel.className='informacoesChannel'

    var linkChannel = window.document.createElement('a')
    linkChannel.className='linkChannel'
    linkChannel.href='/channels/'+datasChannel[0].name+'/'+datasChannel[0].iduser

    var imgPerfil = window.document.createElement('img')
    imgPerfil.className='imgPerfil'
    imgPerfil.src=datasChannel[0].urlimageperfil

    var nameChannel = window.document.createElement('p')
    nameChannel.className='nameChannel'
    nameChannel.innerText=datasChannel[0].name

    linkChannel.appendChild(imgPerfil)
    linkChannel.appendChild(nameChannel)
    containerInfoChannel.appendChild(linkChannel)
    //ligando elementos 
    containerVideo.appendChild(video)
    containerVideo.appendChild(titleVideo)
    containerVideo.appendChild(divDescription)
    containerVideo.appendChild(containerInfoChannel)

    //inserindo elementos

    const container = window.document.querySelector('.containerVideo')
    window.document.body.insertBefore(containerVideo, container)

}