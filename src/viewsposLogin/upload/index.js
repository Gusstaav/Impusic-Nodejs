var idUser = window.location.href;
idUser = idUser.split('/')
idUser = idUser[4]

const idChannel = fetch('/getchannel/'+idUser)
.then((response) => response.json())
.then((dados) => {
    const idChannel = dados[0].id
    const divForm = window.document.querySelector('.form2')
   
    divForm.innerHTML=`<form action="/uploads/${idChannel}/" class="formUpload" method="post" enctype="multipart/form-data" >
                <h1 class='titleUpload'>Criar</h1>
                    <div class="input">
                        <input type='text' name='idUser' value='${idUser}' />
                        <input type='text' name='idchannel' value='${idChannel}' />
                    </div>
                        <p class='titleVideo'>Titulo do video</p>
                            <div class='divTitle'>
                                <textarea maxlength="300" name='title' id="titleVideo" placeholder='titulo do video'></textarea>
                                <span id="countTitle"><p class='numbersRestantes'>300/300</p></span>
                            </div>
                        <p class='description'>Descrição do video</p>
                            <div id='divDescription'>
                                <textarea id="descriptionVideo" rows="4" cols="50" maxlength="5000" placeholder="descrição do video" id="descriptionVideo" name="description"></textarea>
                               <span id='countDescription'><p class="numbersRestantes">5000/5000</p></span>
                            </div>

                        <label id='thumbnail'>
                            <span class='spanThumbnail'></span>
                            <input type="file" name="thumbnail" id="arquivo" placeholder="banner" multiple accept="image/*" />
                        </label> 
                        
                        <label id='labelVideo' >
                            <span class='spanVideo'></span>
                            <input type="file" name="video" id="video" accept="video/*"/>
                        </label>

                        <button type="submit" id="enviar" >enviar</button>
                        <script src="/viewsposLogin/upload/index.js"></script>
                        </form>`    
                // contando caracteres do title
                const titleVideo = window.document.querySelector('#titleVideo')
                var countSpan = window.document.querySelector('#countTitle')
                
                titleVideo.addEventListener('keypress', function(e){
                    const inputLength = titleVideo.value.length
                    const maxChars = 300;

                    const numerosRestantes = maxChars - inputLength

                    var numbers = window.document.createElement('p')
                    numbers.className='numbersRestantes'
                    numbers.innerHTML=numerosRestantes+'/300'
                    
                    
                    countSpan.innerHTML=''
                    countSpan.appendChild(numbers)
                   
                  
                    if(inputLength >= maxChars){
                        e.preventDefault()
                    }
                });
                //contando caracteres da descrição
                var descriptionVideo = window.document.querySelector('#descriptionVideo')
                var countSpanDescription = window.document.querySelector('#countDescription')
                
                descriptionVideo.addEventListener('keypress', function(e){
                    const inputLength = descriptionVideo.value.length
                    const maxChars = 5000;

                    const numerosRestantes = maxChars - inputLength

                    var numbers = window.document.createElement('p')
                    numbers.className='numbersRestantes'
                    numbers.innerHTML=numerosRestantes+'/5000'
                    
                    
                    countSpanDescription.innerHTML=''
                    countSpanDescription.appendChild(numbers)
                   
                  
                    if(inputLength >= maxChars){
                        e.preventDefault()
                    }
                })

                const labelThumbnail = window.document.querySelector('#thumbnail')
                const spanThumbnail = window.document.querySelector('.spanThumbnail')
                spanThumbnail.innerHTML="<p>Escolha sua thumbnail aqui</p>"
            
                
                labelThumbnail.addEventListener('change', function(e){
                    const input = e.target
                    const file = input.files[0]
                    if(file){
                        const reader = new FileReader();

                        reader.addEventListener('load', function(e){
                            const readerTarget = e.target;
                            const imgThumbnail = document.createElement('img')
                            imgThumbnail.className='imgThumbnail'
                            imgThumbnail.src=readerTarget.result

                            spanThumbnail.innerHTML=''
                            spanThumbnail.appendChild(imgThumbnail)
                        })
                        reader.readAsDataURL(file)
                    }else{
                        spanThumbnail.innerHTML='Não foi escolhido uma imagem'
                    }
                    
                })
                // video
                const labelVideo = window.document.querySelector('#labelVideo')
                const spanVideo = window.document.querySelector('.spanVideo')
                spanVideo.innerHTML="Escolha seu video aqui"

                labelVideo.addEventListener('change', function(e){
                    const input = e.target
                    const file = input.files[0]
                        if(file){
                            const reader = new FileReader()
                            reader.addEventListener('load', function(e){
                                const readerTarget = e.target
                                const video = document.createElement('video')
                                video.className='video'
                                video.src=readerTarget.result

                                spanVideo.innerHTML=""
                                spanVideo.appendChild(video)
                            })
                            reader.readAsDataURL(file)
                    }else{
                        spanVideo.innerHTML="Video não escolhido"
                    }
                })
})

