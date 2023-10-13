//Renderizar a página certa de acordo com o stepContent


function DadosEvento(){
    return(
        <div className="">
            <div className='inputGroup'>
                <label htmlFor='nomeDoEvento'>Nome do Evento</label>
                <Input
                  id='nomeDoEvento'
                  name='nomeDoEvento'
                  placeholder='Nome do Evento'
                  type='text'/>
              </div>
        </div>
    )
}

function CriarCertificado(){
    return(
        <div className="">

        </div>
    )
}

function Finalizar(){
    return(
        <div className="">

        </div>
    )
}

function Conteudo({stepContent}){
    function renderContent(){
        switch(stepContent){
            case 1:
                return <DadosEvento />
            case 2:
                return <CriarCertificado />
            case 3:
                return <Finalizar />
            default:
                return <DadosEvento />
        }
    }
    return(
        <div className="conteudo">
            {renderContent()}
        </div>
    )
}


export default Conteudo