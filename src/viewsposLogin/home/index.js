
            var idUser = window.location.href;
            idUser = idUser.split('/');
            idUser = idUser[4]
            
            var idChannel = window.location.href
            idChannel = idChannel.split('/')
            idChannel = idChannel[4]
            


const verifyChannel = fetch('http://localhost:3030/verifyChannel/dados/'+idChannel)
.then((dadosPromise) => dadosPromise.json())
.then((dados) => {
        if(dados == []){
          adcElemento(dados)
        }
        if(dados){
            const datas = dados
            adcElemento(datas)
        }
    } )    

var urlPadrao = window.location.href;


function adcElemento (datas) {
        console.log(datas)

            if(datas.url === datas[0]){
                var linkModal = window.document.createElement('a')
                linkModal.className='linkChannel'
                linkModal.innerText='Seu canal'
                linkModal.href='#modal'
            }else{
                var linkModal = window.document.createElement('a')
                linkModal.className='linkChannel'
                linkModal.innerText='Seu canal'
                linkModal.href='/channel/'+idChannel
            }
            // cria um novo elemento div
            // e dá à ele conteúdo
            var divNova = window.document.createElement("div");
            divNova.className='header'
            
            var h1 = window.document.createElement("h1");
            h1.className='title'
            h1.innerText='Impusic'

            //navigation
            var divNavigation = window.document.createElement('div');
            divNavigation.className='navigations'

            var a1 =window.document.createElement('a');
            a1.className='links';
            a1.innerText='Home';
            a1.href=window.location.href;
            
            if(datas.url === datas[0]){
                var a2 = window.document.createElement('a')
                a2.className='links'
                a2.innerText='Criar'
                a2.href='#modal'
            }else{
                var a2 =window.document.createElement('a');
                a2.className='links';
                a2.innerText='Criar';
                a2.href='/uploads/'+idUser;
            }


            var a3 =window.document.createElement('a');
            a3.className='links';
            a3.innerText='Sobre';
            a3.href='/sobre';
            
            //bottons sair e channel

            var links = window.document.createElement('div')
            links.className='linkBottons'

            var divBottomSair = window.document.createElement('div')
            divBottomSair.className='divBottomSair'

            var divBottomChannel = window.document.createElement('div')
            divBottomChannel.className='divBottomChannel'
            
            var linkSair = window.document.createElement('a')
            linkSair.className='linkSair'
            linkSair.innerText='Sair'
            linkSair.href='/'
            
            
            //criando modal

            var divModal = window.document.createElement('div')
            divModal.className='modal'
            divModal.id="modal"

            var modal_content = window.document.createElement('div')
            modal_content.className="modal__content"

            var titleModal = window.document.createElement('p')
            titleModal.className="titleModal"
            titleModal.innerText="Você não possui um canal, gostaria de criar um?"

            var divBottonsModal = window.document.createElement('div')
            divBottonsModal.className="bottoms"

            var divBottomModalYes = window.document.createElement('div')
            divBottomModalYes.className='bottomYesModal'

            var bottomModalYes = window.document.createElement('a')
            bottomModalYes.className="bottonsLinks"
            bottomModalYes.innerText='Sim'
            bottomModalYes.href='/createChannel/'+idUser
            
            var divBottomModalClose = window.document.createElement('div')
            divBottomModalClose.className='bottomCloseModal'

            var bottomClose = window.document.createElement('a')
            bottomClose.className="bottonsLinks"
            bottomClose.innerText='Não'
            bottomClose.href=urlPadrao


            //adiciona o nó de texto à nova div criada
            //navigations
            divNavigation.appendChild(a1)
            divNavigation.appendChild(a2)
            divNavigation.appendChild(a3)
            //divs sair e canal
            divBottomChannel.appendChild(linkModal)
            divBottomSair.appendChild(linkSair)
            links.appendChild(divBottomChannel)
            links.appendChild(divBottomSair)
            //title
            divNova.appendChild(h1); 
            divNova.appendChild(divNavigation)
            divNova.appendChild(links)

            //modal
            divBottonsModal.appendChild(divBottomModalYes)
            divBottonsModal.appendChild(divBottomModalClose)
            divBottomModalYes.appendChild(bottomModalYes)
            divBottomModalClose.appendChild(bottomClose)
            modal_content.appendChild(titleModal)
            modal_content.appendChild(divBottonsModal)
            divModal.appendChild(modal_content)

            divNova.appendChild(divModal)
            
            // adiciona o novo elemento criado e seu conteúdo ao DOM
            var divAtual = window.document.getElementById("header0");
            window.document.body.insertBefore(divNova, divAtual);
        
            }

//feed de videos

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
        linkChannel.href='/'+datasChannels[0].iduser+'/Channels/'
        

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
        linkVideo.href='/wach?v='+i.id
        //ligando linkVideo ao demais e ao grid
        linkVideo.appendChild(thumbnail)
        linkVideo.appendChild(containerCabecalho)
        gridVideo.appendChild(linkVideo)


    }

    videosContainer.appendChild(gridVideo)

    var container = window.document.querySelector('.container')
    
    window.document.body.insertBefore(videosContainer, container)


}