import React, { useState } from "react";
import useStore from "../zustand/todo";
import {
  MdOutlineDelete,
  MdEdit,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GiEmptyWoodBucketHandle } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import { Card, Input, Button, Modal } from "components";
import { FormProvider, useForm } from "react-hook-form";
import { isEmptyArray } from "../utils/function.util";

interface AddtodoDto {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function Home() {
  const { todos, deleteTodo, addTodo, editTodo, toggleTodo } = useStore(
    (state) => {
      return {
        todos: state.todos,
        deleteTodo: state.deleteTodo,
        addTodo: state.addTodo,
        editTodo: state.editTodo,
        toggleTodo: state.toggleTodo,
      };
    }
  );

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<Omit<AddtodoDto, "id">>({
    description: "",
    title: "",
    completed: false,
  });
  const [idForEdit, setIdForEdit] = useState<number>(0);
  const methods = useForm<Omit<AddtodoDto, "id">>();
  const methodsSheet = useForm<Omit<AddtodoDto, "id">>();
  const EditModalmethods = useForm<AddtodoDto>();
  const EditSheetmethods = useForm<AddtodoDto>();
  const addItem = methods.handleSubmit((data: Omit<AddtodoDto, "id">) => {
    addTodo(data.title, data.description);
    methods.reset();
  });

  const addItemSheet = methodsSheet.handleSubmit(
    (data: Omit<AddtodoDto, "id">) => {
      addTodo(data.title, data.description);
      methods.reset();
    }
  );

  const deleteItem = (id: number) => {
    deleteTodo(id);
  };

  const editModal = EditModalmethods.handleSubmit((data: AddtodoDto) => {
    editTodo(idForEdit, data);
  });

  const editSheet = EditSheetmethods.handleSubmit((data: AddtodoDto) => {
    editTodo(idForEdit, data);
  });

  const openEditModal = (item: AddtodoDto) => {
    EditModalmethods.setValue("title", item.title);
    EditModalmethods.setValue("description", item.description);
    EditSheetmethods.setValue("title", item.title);
    EditSheetmethods.setValue("description", item.description);
    setIdForEdit(item.id);
    setShowEditModal(true);
  };
  const toggle = (id: number) => {
    toggleTodo(id);
  };
  const editForm = (id: string, method: any) => (
    <FormProvider {...method}>
      <form id={id}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const data: Omit<AddtodoDto, "id"> = {
              title: e.target.value,
              description: editInfo.description,
              completed: false,
            };
            setEditInfo({ ...data });
          }}
          label="title"
          name="title"
          validations={{
            required: {
              value: true,
              message: "please enter title",
            },
          }}
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const data: Omit<AddtodoDto, "id"> = {
              title: editInfo.title,
              description: e.target.value,
              completed: false,
            };
            setEditInfo(data);
          }}
          label="description"
          name="description"
          validations={{
            required: {
              value: true,
              message: "please enter description",
            },
          }}
        />
      </form>
    </FormProvider>
  );
  return (
    <>
      <div className="flex justify-between">
        <div className="bg-blue-100  h-screen  overflow-y-scroll  p-2  w-1/2  flex-1 ">
          {!isEmptyArray(todos) ? (
            todos.map((item: AddtodoDto) => (
              <Card
                className={`rounded-lg mb-5 ${
                  item.completed && "!bg-blue-50"
                } `}
              >
                <div className="text-left flex justify-between  items-center ">
                  <div>
                    <MdOutlineDelete
                      className=" inline-block  text-xl text-red-500 cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    />
                    <span className="px-1 ">
                      <MdEdit
                        className=" inline-block  text-xl text-blue-500 cursor-pointer"
                        onClick={() => openEditModal(item)}
                      />
                    </span>
                    <span className="px-1  ">
                      {item.completed ? (
                        <AiTwotoneCheckCircle
                          className=" inline-block  text-xl text-blue-500 cursor-pointer"
                          onClick={() => toggle(item.id)}
                        />
                      ) : (
                        <MdRadioButtonUnchecked
                          className=" inline-block  text-xl text-blue-500 cursor-pointer"
                          onClick={() => toggle(item.id)}
                        />
                      )}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`text-lg text ${
                        item.completed && "line-through"
                      }`}
                    >
                      {item.title}{" "}
                    </div>
                    <div
                      className={`text-gray-600  text-md ${
                        item.completed && "line-through"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex justify-center items-center h-screen">
              <GiEmptyWoodBucketHandle className="text-9xl" />
            </div>
          )}
          <IoAddCircleOutline
            className=" text-6xl  fixed right-2 bottom-10 cursor-pointer md:hidden lg:hidden"
            onClick={() => setOpenSheetModal(true)}
          />
        </div>
        <div
          className={`  hidden  sm:hidden md:inline-block lg:inline-block  w-1/4 p-2  h-screen text-center  shadow-lg  rounded-md border border-blue-200 bg-white `}
        >
          <div className=" p-4 rounded-lg shadow-lg">
            <FormProvider {...methods}>
              <form id="add-todo">
                <Input
                  label="title"
                  name="title"
                  validations={{
                    required: {
                      value: true,
                      message: "please enter title",
                    },
                  }}
                />
                <Input
                  label="description"
                  name="description"
                  validations={{
                    required: {
                      value: true,
                      message: "please enter description",
                    },
                  }}
                />
                <div className="text-right ">
                  <Button
                    type="submit"
                    onClick={addItem}
                    className=" bg-red-50 mt-2 text-md"
                  >
                    <IoMdAdd className=" inline-block ml-2 text-md" />
                    <span>add</span>
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <Modal
          show={showEditModal}
          title={"edit"}
          onClickClose={() => setShowEditModal(false)}
          onClickBackdrop={() => setShowEditModal(false)}
          modalContent={editForm("edit-modal", EditModalmethods)}
          sheetContent={editForm("edit-sheet", EditSheetmethods)}
          modalFooter={
            <Button color="primary" onClick={editModal}>
              <MdEdit className=" inline-block ml-2 text-md" />
              <span>edit</span>
            </Button>
          }
          sheetFooter={
            <div className="w-full text-left">
              <Button color="primary" onClick={editSheet}>
                <MdEdit className=" inline-block ml-2 text-md" />
                <span>edit</span>
              </Button>
            </div>
          }
        />

        <Modal
          show={openSheetModal}
          title="add to todolist"
          sheetContent={
            <FormProvider {...methodsSheet}>
              <form id="add-todo">
                <Input
                  label="title"
                  name="title"
                  validations={{
                    required: {
                      value: true,
                      message: "please enter title",
                    },
                  }}
                />
                <Input
                  title="add "
                  label="description"
                  name="description"
                  validations={{
                    required: {
                      value: true,
                      message: "please enter description",
                    },
                  }}
                />
              </form>
            </FormProvider>
          }
          onClickBackdrop={() => setOpenSheetModal(false)}
          sheetFooter={
            <div className="text-right w-full ">
              <Button
                type="submit"
                onClick={addItemSheet}
                className=" bg-red-50 mt-2 text-md"
              >
                <IoMdAdd className=" inline-block ml-2 text-md" />
                <span>add</span>
              </Button>
            </div>
          }
        />
      </div>
    </>
  );
}

export default Home;
