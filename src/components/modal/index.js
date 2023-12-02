import ModalFooter from './modalFooter';
import ModalHeader from './modalHeader';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
export default function Modal({ title, children, dismiss, buttonTitle, onClick }) {
    //Modal Genérico
    /*
    Possui um título, corpo e 2 botões por padrão (ver ModalFooter)
    título, texto e ação no onClick do botão principal passado por props
    dismiss é a ação no onClick do botão secundário e botão de fechar
    permite customizar o corpo do modal através do children
    se não for passado o título ou ação do botão principal, 
    o ModalFooter não o renderiza, o que é útil para quando se quer apenas exibir informações,
    sem a necessidade de uma ação pelo usuário
    */

    return (
        <div className={styles.modalShadow} id='modalOpen'>
            <div className={styles.modal}>
                <ModalHeader
                    title={title}
                    dismiss={dismiss} />
                <div className={styles.modalBody}>
                    {children}
                </div>
                <ModalFooter
                    dismiss={dismiss}
                    buttonTitle={buttonTitle}
                    onClick={onClick} />
            </div>
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    dismiss: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string,
    onClick: PropTypes.func
}