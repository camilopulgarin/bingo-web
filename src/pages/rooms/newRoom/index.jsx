import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/usersNewRoomSlice";
import { createNewGame } from "../../../redux/slices/postNewRoomSlice";
import { validationSchema } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showSuccess, showError } from '../../../utils/toast';

export default function NewRoom() {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.users);
  const { loading: creatingGame, error: gameError } = useSelector((state) => state.games);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { name: "", capacity: 5, userIds: [] },
  });

  const userIds = watch("userIds");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createNewGame(data));
      if (createNewGame.fulfilled.match(resultAction)) {
        showSuccess("🎉 Partida creada exitosamente" );
        setSearchTerm("");
        reset();
      } else {
        throw new Error(resultAction.error?.message || "Error al crear la partida");
      }
    } catch (err) {
      showError(`❌ ${err.message}`);
    }
  };

  const handleAddUser = (userId) => {
    if (userId && !userIds.includes(userId)) {
      setValue("userIds", [...userIds, userId], { shouldValidate: true });
      setSearchTerm("");
    }
  };

  const handleRemoveUser = (userId) => {
    const updated = userIds.filter((id) => id !== userId);
    setValue("userIds", updated, { shouldValidate: true });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !userIds.includes(user.id)
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-[#e8b647] rounded-xl shadow-md space-y-4 text-gray-600 mt-15">
      <h2 className="text-xl font-bold">Crear Nueva Partida</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre de la partida</label>
          <input {...register("name")} type="text" className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Capacidad</label>
          <input {...register("capacity")} type="number" className="w-full p-2 border rounded" />
          {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Buscar Usuarios</label>
          <input
            type="text"
            placeholder="Escribe un nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {searchTerm.length > 0 && (
            <>
              {filteredUsers.length > 0 ? (
                <ul className="border rounded max-h-40 overflow-auto bg-white mt-1">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => handleAddUser(user.id)}
                      className="p-2 cursor-pointer hover:bg-blue-100"
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-1">No se encontraron usuarios</p>
              )}
            </>
          )}

          <ul className="mt-2 space-y-1">
            {userIds.map((id) => {
              const user = users.find((user) => user.id === id);
              return (
                <li
                  key={id}
                  className="p-1 bg-gray-200 rounded flex justify-between items-center"
                >
                  {user ? user.name : "Usuario no encontrado"}
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(id)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded opacity-50 hover:opacity-100"
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>

          {errors.userIds && (
            <p className="text-red-500 text-sm mt-1">{errors.userIds.message}</p>
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
