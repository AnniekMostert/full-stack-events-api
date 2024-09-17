import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    categories: await categories.json(),
  };
};

export const AddEvent = ({ user }) => {
  const { categories } = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();

  // defaultValues for testing:
  const defaultValues = {
    createdBy: "2",
    title: "Boogschieten",
    description: "Boogschietworkshop voor kinderen en volwassenen",
    image: "../boogschieten.jpg",
    categoryIds: ["1"],
    location: "Panbos",
    startingDate: "2024-07-06",
    startingTime: "14:00",
    endingDate: "2024-07-06",
    endingTime: "15:30",
  };
  // const defaultValues = {
  //   createdBy: "",
  //   title: "",
  //   description: "",
  //   image: "",
  //   categoryIds: [],
  //   location: "",
  //   startingDate: "",
  //   startingTime: "",
  //   endingDate: "",
  //   endingTime: "",
  // };

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const STIME = getValues("startingTime");
  const SDATE = getValues("startingDate");
  const ETIME = getValues("endingTime");
  const EDATE = getValues("endingDate");

  const validateEndtime = () => {
    if (SDATE === EDATE) {
      if (STIME > ETIME) {
        return "The end time cannot be before the start time";
      }
      if (STIME === ETIME) {
        return "I think your event takes longer than that 😄";
      }
    }
    return true;
  };

  const onSubmit = async (data) => {
    const startTime = new Date(`${SDATE}T${STIME}`).toISOString();
    const endTime = new Date(`${EDATE}T${ETIME}`).toISOString();

    const newEvent = {
      createdBy: Number(user.id),
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: data.categoryIds.map((id) => Number(id)),
      location: data.location,
      startTime,
      endTime,
    };

    const createEvent = async () => {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create an event. Status: ${response.status}`
        );
      }
      return response.json();
    };

    try {
      await toast.promise(createEvent(), {
        success: {
          title: "The event is added",
          description: "Looks great",
        },
        error: {
          title: "The event couldn't be added",
          description: "Something wrong",
        },
        loading: {
          title: "The event is being added",
          description: "Please wait",
        },
      });
      const id = (await createEvent()).id;
      navigate(`/event/${id}`);
      reset();
    } catch (error) {
      console.error("An error occurred while creating a event:", error);
    }
  };

  return (
    <>
      <Heading textAlign="center" marginY={5}>
        Add event:
      </Heading>
      <Box
        bgColor="teal.100"
        width={{ base: "90vw", sm: "90vw" }}
        maxW="500px"
        borderRadius="10px"
        marginX="auto"
        marginY={5}
        padding="5vw"
        position="relative"
      >
        <Link to={`/`}>
          <CloseButton
            position="absolute"
            right="0px"
            top="0px"
            borderRadius="0px"
            background="teal.200"
            borderTopRightRadius="9px"
            _hover={{ bgColor: "teal.300" }}
            _active={{ bgColor: "teal.300" }}
            _focusVisible={{ shadow: "none" }}
          />
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" rowGap="15px">
            <FormControl className="createdBy">
              <FormLabel>
                My name <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Text>{user.name}</Text>
            </FormControl>

            <FormControl className="title">
              <FormLabel>
                Title <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Input
                type="text"
                name="title"
                {...register("title", {
                  required: "Fill in a title for your event",
                })}
              />
              <Text color="red.500">{errors.title?.message}</Text>
            </FormControl>

            <FormControl className="description">
              <FormLabel>
                Short description <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="description"
                {...register("description", {
                  required: "Fill in a short description for your event",
                  maxLength: {
                    value: 50,
                    message: "Please, keep the description short",
                  },
                })}
              />
              <Text color="red.500">{errors.description?.message}</Text>
            </FormControl>

            <FormControl className="image">
              <FormLabel>
                Image url <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="image"
                {...register("image", {
                  required: "Upload an image for your event",
                })}
              />
              <Text color="red.500">{errors.image?.message}</Text>
            </FormControl>

            <FormControl className="category">
              <FormLabel>
                Category <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Stack direction={{ base: "column", sm: "row" }} columnGap={5}>
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    name={category.id}
                    value={category.id}
                    {...register("categoryIds", {
                      validate: (value) =>
                        value.length > 0 ||
                        "At least one category must be selected",
                    })}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Stack>
              {errors.categoryIds && (
                <Text color="red.500">{errors.categoryIds.message}</Text>
              )}
            </FormControl>

            <FormControl className="location">
              <FormLabel>
                Location <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Input
                type="text"
                name="location"
                {...register("location", {
                  required: "Fill in a location for your event",
                })}
              />
              <Text color="red.500">{errors.location?.message}</Text>
            </FormControl>

            <FormControl className="startTime">
              <FormLabel>
                Start time <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Flex direction={{ base: "column", sm: "row" }} gap="10px">
                <Input
                  type="date"
                  {...register("startingDate", {
                    required: "Select the date your event starts",
                  })}
                />
                <Input
                  type="time"
                  {...register("startingTime", {
                    required: "Select the time your event starts",
                  })}
                />
              </Flex>
              <Text color="red.500">{errors.startingDate?.message}</Text>
              <Text color="red.500">{errors.startingTime?.message}</Text>
            </FormControl>

            <FormControl className="endTime">
              <FormLabel>
                End time <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Flex direction={{ base: "column", sm: "row" }} gap="10px">
                <Input
                  type="date"
                  {...register("endingDate", {
                    required: "Select the date your event ends",
                    validate: (value) =>
                      value >= getValues("startingDate") ||
                      "The end date cannot be before the start date",
                  })}
                />
                <Input
                  type="time"
                  {...register("endingTime", {
                    required: "Select the time your event ends",
                    validate: validateEndtime,
                  })}
                />
              </Flex>
              <Text color="red.500">{errors.endingDate?.message}</Text>
              <Text color="red.500">{errors.endingTime?.message}</Text>
            </FormControl>

            <Divider borderColor="red.700" opacity="1" borderWidth={1} />

            <Flex direction={{ base: "column", sm: "row" }} gap="10px">
              <Button
                variant="back"
                flex={{ sm: 1 }}
                onClick={() => navigate("/")}
              >
                Back
              </Button>
              <Button type="submit" flex={{ sm: 1 }}>
                Add event
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </>
  );
};
