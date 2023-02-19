async function GetVideosFeed(){
    const videos = await fetch('/feed')
    .then((data) => data.json())
    .then((videos) => GridFeedVideo(videos))
}

GetVideosFeed()

async function GridFeedVideo(videos){
    const datasVideo = videos
    
    var videosContainer = window.document.createElement('div')
    videosContainer.className='container'
    
    var gridVideo = window.document.createElement('div')
    gridVideo.className='gridVideos'
    
    
    for(var i of datasVideo){

        //buscando canais do videos
        var datasChannels = []
        
            let response = await fetch('/getChannelWachScreen?idchannel='+i.idchannel)
            .then(data => data.json())
            
           datasChannels = await response
        
        //montando elementos do grid
        
        var thumbnail = window.document.createElement('img')
        thumbnail.className='thumbnail'
        thumbnail.src=i.urlcapa

        var titleVideo = window.document.createElement('p')
        titleVideo.id='titleVideo'
        titleVideo.innerText=i.title

        var linkChannel = window.document.createElement('a')
        linkChannel.href='/channels/'+datasChannels[0].name+'/'+datasChannels[0].iduser
        
        var imagesChannel = window.document.createElement('img')
        imagesChannel.className='imagesChannels'
        imagesChannel.src=datasChannels[0].urlimageperfil

        linkChannel.appendChild(imagesChannel)

        var nameChannel = window.document.createElement('p')
        nameChannel.className='nameChannel'
        nameChannel.innerText=datasChannels[0].name

        var containerCabecalho = window.document.createElement('div')
        containerCabecalho.className='cabecalho'

        var ChannelInfo = window.document.createElement('a')
        ChannelInfo.className='ChannelInfo'
        //ligando informações da canal {title do video e nome do canal}
        ChannelInfo.appendChild(titleVideo)
        ChannelInfo.appendChild(nameChannel)
        //ligando o cabeçalho com a imagem de perfil e as informações do canal e video
        containerCabecalho.appendChild(linkChannel)
        containerCabecalho.appendChild(ChannelInfo)

        var linkVideo = window.document.createElement('a')
        linkVideo.className='LinkVideo'
        linkVideo.href='wach?v='+i.id
        //ligando linkVideo ao demais e ao grid
        linkVideo.appendChild(thumbnail)
        linkVideo.appendChild(containerCabecalho)
        gridVideo.appendChild(linkVideo)

        
        
    }

    videosContainer.appendChild(gridVideo)

    var container = window.document.querySelector('.container')
    
    window.document.body.insertBefore(videosContainer, container)

    console.log(document.body)
   
}