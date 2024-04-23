import { Button, Form } from "react-bootstrap";
import Listatareas from "./Listatareas";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FormularioTareas = () => {
  const [nombreTarea, setNombreTarea] = useState("");
  const [tareas, setTareas] = useState(
    JSON.parse(localStorage.getItem("ListaTareaKey")) || []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    //verificar si la tarea ya existe en array  de tareas
    if(tareas.includes(data.nombreTarea)){
      alert('La tarea ya existe')
    }else{
      setTareas([...tareas, data.nombreTarea]); //operador spread
      reset();
    }
    // tareas.push(nombreTarea)
    //
    //limpiar el input
    setNombreTarea("");
  };

  // aqui agrego el codigo del ciclo de vida
  useEffect(() => {
    //Aqui agregar el codigo que quiero ejecutar en el montaje y act. del componente
    console.log("estoy dentro del usuEffect");
    localStorage.setItem("ListaTareaKey", JSON.stringify(tareas));
  }, [tareas]);

  const borrarTarea = (nombre) => {
    const tareasActualizadas = tareas.filter(
      (itemTarea) => itemTarea !== nombre
    );
    // actualizar el state tareas
    setTareas(tareasActualizadas);
  };

  return (
    <section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 d-flex" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ej: tarea 1"
            //minLength={3}
            //maxLength={50}
            //onChange={(e) => setNombreTarea(e.target.value)}
            //value={nombreTarea}
            {...register("nombreTarea", {
              required: "El nombre de la tarea es obligatorio.",
              minLength: {
                value: 3,
                message:
                  "El nombre de la tarea debe contener 3 caracteres como minimo",
              },
              maxLength: {
                value: 50,
                message:
                  "El nombre de la tarea debe contener 50 caracteres como maximo",
              },
            })}
          />
          <Button variant="primary" className="mx-2" type="submit">
            Enviar
          </Button>
        </Form.Group>
        <Form.Text className="text-light">
          {errors.nombreTarea?.message}
        </Form.Text>
      </Form>
      <Listatareas tareasProps={tareas} borrarTarea={borrarTarea}></Listatareas>
    </section>
  );
};

export default FormularioTareas;
