import { useSession } from "next-auth/react";
import styles from "./finalizar.module.css";

export default function Finalizar({ setIsValidData, eventObject}) {
    //Obter os dados das steps anteriores
    const { name, informations, dates, workload } = eventObject;
    const dateStart = new Date(eventObject.dateStart).toLocaleDateString();
    const timeStart = new Date(eventObject.dateStart).toLocaleTimeString();
    const dateEnd = new Date(eventObject.dateEnd).toLocaleDateString();
    const timeEnd = new Date(eventObject.dateEnd).toLocaleTimeString();
    const eventHash = 123456789; //Gerar um hash para o evento no backend

    const session = useSession();
    const organizador = session?.data?.user?.name;
    const handleClick = (e) => {
        e.preventDefault();
        let el = document.getElementById("link");
        el.select();
        navigator.clipboard.writeText(el.value);
        let p = document.querySelector(`.${styles.copied}`);
        p.style.display = "block";
    }

    const { getValues } = useFormContext()

    return (
        <div className={styles.content}>
            <div>
                <h2>Conferir dados do evento</h2>
                <p>Nome do evento: {name}</p>
                <p>Descrição: {informations}</p>
                <p>Organizador: {organizador}</p>
                <p>Data: {dateStart} - {timeStart} até {dateEnd} - {timeEnd}</p>
                <p>Carga Horária: {workload}h</p>
            </div>
            <div className={styles.rightContent}>
                <label htmlFor="link">Link do evento</label>
                <div className={styles.input_group}>
                    <input className={styles.input} type="text" disabled={true} value={eventHash} id="link" placeholder="Link do evento" />
                    <button className={styles.buttonLink} onClick={handleClick} >Copiar link</button>
                </div>
                <p className={styles.copied}>Link copiado!</p>
            </div>
        </div>
    )
}