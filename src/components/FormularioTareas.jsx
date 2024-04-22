import { Button, Form } from "react-bootstrap";
import Listatareas from "./Listatareas";
import { useEffect,useState  } from "react";

const FormularioTareas = () => {
  const [nombreTarea, setNombreTarea] = useState("");
 const [tareas, setTareas] = useState( JSON.parse(localStorage.getItem('ListaTareaKey')) || [] );

const handleSubmit = (e)=>{
  e.preventDefault();
// tareas.push(nombreTarea)
setTareas([...tareas, nombreTarea]); //operador spread
//limpiar el input
setNombreTarea('');
}

// aqui agrego el codigo del ciclo de vida
useEffect(()=>{
  //Aqui agregar el codigo que quiero ejecutar en el montaje y act. del componente
  console.log('estoy dentro del usuEffect');
  localStorage.setItem('ListaTareaKey', JSON.stringify(tareas))
},[tareas])

const borrarTarea = (nombre)=>{
  const tareasActualizadas = tareas.filter((itemTarea)=> itemTarea !== nombre )
  // actualizar el state tareas
  setTareas(tareasActualizadas);
}

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ej: tarea 1"
            minLength={3}
            maxLength={50}
            onChange={(e) => setNombreTarea(e.target.value)}
            value={nombreTarea}
          />
          <Button variant="primary" className="mx-2" type="submit">
            Enviar
          </Button>
        </Form.Group>
      </Form>
      <Listatareas tareasProps={tareas} borrarTarea={borrarTarea}></Listatareas>
    </section>
  );
};

export default FormularioTareas;
