'use client'
import Button from "../button";
import Input from "../input";
import Modal from "../modal";
import QRCode from "../qrCode";
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function EventLink({ eventId, dismiss }) {
    const url = window.location.origin + "/evento/listar?eventId=" + eventId+"&inscricao=true"
    const copyLink = (e) => {
        e.preventDefault();
        let el = document.getElementById("link");
        el.select();
        navigator.clipboard.writeText(el.value).then(() => {
            let p = document.querySelector(`.${styles.copied}`);
            p.style.visibility = "visible";
            setTimeout(() => {
                p.style.visibility = "hidden";
            }, 2E3);
        });
    }

    return (
        <Modal
            title="Evento Criado"
            dismiss={dismiss}
        >
            <p>
                Evento criado com sucesso!
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
                Compartilhe o link e o qrCode abaixo para que as pessoas possam se inscrever no seu evento.
            </p>
            <QRCode
                size={200}
                url={url}
            />

            <div className={styles.inputGroup} >
                <Input
                    width="80%"
                    id="link"
                    type="text"
                    value={url}
                    readOnly={true}
                    disabled={true}
                />
                <p className={styles.copied}>Link copiado!</p>
                <Button
                    onClick={copyLink}
                    isEnabled={true}
                >
                    Copiar Link
                </Button>

            </div>

        </Modal>
    )
}

EventLink.propTypes = {
    eventId: PropTypes.string.isRequired,
    dismiss: PropTypes.func.isRequired
}