
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchUsers } from "../../../redux/slices/usersNewRoomSlice"; // Importa la acción para obtener usuarios
  import { createNewGame } from "../../../redux/slices/postNewRoomSlice"; // Importa la acción para crear una partida
  import { validationSchema } from "./validations";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  
  export default function NewRoom() {
    const dispatch = useDispatch();
    const { users = [], loading, error } = useSelector((state) => state.users);
    const { loading: creatingGame, error: gameError } = useSelector((state) => state.games);
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  
    // useForm con Yup como validador
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: { name: "", capacity: 5, userIds: [] },
    });
  
    const userIds = watch("userIds");
  
    const onSubmit = async (data) => {
      dispatch(createNewGame(data));
    };
  
    const handleAddUser = (userId) => {
      if (userId && !userIds.includes(userId)) {
        setValue("userIds", [...userIds, userId]);
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 text-gray-600">
        <h2 className="text-xl font-bold">Crear Nueva Partida</h2>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre de la partida</label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
  
          <div>
            <label className="block font-medium">Capacidad</label>
            <input
              {...register("capacity")}
              type="number"
              className="w-full p-2 border rounded"
            />
            {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
          </div>
  
          <div>
            <label className="block font-medium">Usuarios</label>
            {loading ? (
              <p>Cargando usuarios...</p>
            ) : error ? (
              <p className="text-red-500">Error al cargar usuarios</p>
            ) : (
              <>
                <select
                  onChange={(e) => handleAddUser(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Seleccionar usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
  
                {errors.userIds && <p className="text-red-500 text-sm">{errors.userIds.message}</p>}
  
                <ul className="mt-2">
                  {userIds.map((id) => (
                    <li key={id} className="p-1 bg-gray-200 rounded mt-1">
                      {id}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
  
          {gameError && <p className="text-red-500">{gameError}</p>}
  
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
            disabled={isSubmitting || creatingGame}
          >
            {creatingGame ? "Creando..." : "Crear Partida"}
          </button>
        </form>
      </div>
    );
  }
  