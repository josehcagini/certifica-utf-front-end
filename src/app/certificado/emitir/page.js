'use client'
import ItemList from "@/components/itemList"
import { useEffect, useState } from "react";
import Button, { ButtonType } from "@/components/button";
import styles from './styles.module.css';
import { fetchData } from "@/app/api/utils/apiUtils";

export default function EmitirCertificado() {
    const [certificados, setCertificados] = useState([])
    const [checked, setChecked] = useState([]);

    const handleCheck = (e) => {
        let id = e.target.id.split('-')[1];
        let pseudoCheckbox = document.getElementById('pseudoCheckbox-' + id);
        if (e.target.checked) {
            pseudoCheckbox.classList.add(styles.checked);
            setChecked([...checked, id]);
        } else {
            pseudoCheckbox.classList.remove(styles.checked);
            setChecked(checked.filter((item) => item !== id));
        }
    }
    
    const emitir = async () => {
        const response = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/certificado/emitir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ids: checked}),
        })
        const data = await response.json()
        if (response.status === 200) {
            alert('Certificado emitido com sucesso');
            location.reload();

        } else {
            alert('Erro ao emitir certificado')
        }
    }

    const getCertificados = async () => {
        const response = await fetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/certificados/emitir`)
        const data = await response.json()
        if (response.status === 200) {
            setCertificados(data);
        } else {
            alert('Erro ao buscar certificados')
        }
    };

    useEffect(() => {
        getCertificados()
    },[]);

    return (
        <div className="main">
            <h1>Certificados Disponíveis</h1>
            <div className='defaultGrid'>
                { certificados.length !==0 ?
                    certificados.map((certificado) => {
                        return (
                            <ItemList
                                key={certificado.id}
                                title={certificado.dsTitulo}
                                subtitle={certificado.dtConclusao}
                            >
                                <label
                                    className={styles.labelBtnCheck}
                                    id={'pseudoCheckbox-' + certificado.id}
                                    htmlFor={'certificado-' + certificado.id}
                                ></label>
                                <input
                                    type="checkbox"
                                    onChange={handleCheck}
                                    className={styles.btnCheck}
                                    id={'certificado-' + certificado.id}
                                />
                            </ItemList>
                        )
                    }) :
                    <h2>Nenhum certificado disponível</h2>
                }
            </div>
            {checked.length !== 0 &&
            <Button
                onClick={emitir}
                isEnabled={true}
                styletype={ButtonType.SECONDARY}
                style={{ marginTop: '2.5rem' }}
            >
                Emitir Certificado(s)
            </Button>}

        </div>
    )
}