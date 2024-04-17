import { Button, Form } from "react-bootstrap";
import Listatareas from "./Listatareas";
import { useState } from "react";

const FormularioTareas = () => {
 const [nombreTarea, setNombreTarea ] = useState('');


  return (
    <section>
      <Form>
        <Form.Group className="mb-3 d-flex" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ej: tarea 1"
            minLength={3}
            maxLength={50}
         onChange= {(e)=> setNombreTarea(e.target.value) }
          />
          <Button variant="primary" className="mx-2" type="submit">Enviar</Button>
        </Form.Group>
      </Form>
      <Listatareas ></Listatareas>
    </section>
  );
};

export default FormularioTareas;
