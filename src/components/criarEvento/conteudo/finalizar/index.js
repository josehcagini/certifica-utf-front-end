import { useSession } from "next-auth/react";
import styles from "./finalizar.module.css";

export default function Finalizar({ eventObject, certificateObject }) {
    //Obter os dados das steps anteriores
    const { name, informations, dates, workload } = eventObject;
    const dateStart = new Date(eventObject.dateStart).toLocaleDateString();
    const timeStart = new Date(eventObject.dateStart).toLocaleTimeString();
    const dateEnd = new Date(eventObject.dateEnd).toLocaleDateString();
    const timeEnd = new Date(eventObject.dateEnd).toLocaleTimeString();

    const session = useSession();
    const organizador = session?.data?.user?.name;
    /*const handleClick = (e) => {  Utilizar em outra tela, após o retorno 201 da api
        e.preventDefault();
        let el = document.getElementById("link");
        el.select();
        navigator.clipboard.writeText(el.value);
        let p = document.querySelector(`.${styles.copied}`);
        p.style.display = "block";
    }*/

    return (
        <div className={styles.content}>
            <div>
                <h2>Conferir dados do evento</h2>
                <p>Nome do evento: {name}</p>
                <p>Descrição: {informations}</p>
                <p>Organizador: {organizador}</p>
                <p>Data: {dateStart} - {timeStart} até {dateEnd} - {timeEnd}</p>
                <p>Horários do evento:</p>
                {
                    dates.length > 0 ?
                    dates.map((date, index) => {
                        const dateFormat = new Date(date.date).toLocaleDateString();
                        return (
                            <p key={index} className={styles.subItem}>{dateFormat} - {date.startTime}h até {date.endTime}h</p>
                        )
                    })
                    :<p className={styles.subItem}>Não informado</p>
                }
                <p>Carga Horária: {workload}h</p>
            </div>
        </div>
    )
}