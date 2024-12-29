import React from 'react'
import DatePicker from "react-datepicker";
import {useFieldArray, useForm} from "react-hook-form"
import { Controller } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

// const formSchema = z.object({
//     firstName: z.string().min(1, "First Name is required"),
//     lastName: z.string().min(1, "Last Name is required"),
//     email: z.string().email("Invalid email address"),
//     age: z.number().min(18, "You must be at least 18 years old"),
//     gender: z.enum(["male", "female", "other"], {
//       message: "Gender is required",
//     }),
//     address: z.object({
//       city: z.string().min(1, "City is required"),
//       state: z.string().min(1, "State is required"),
//     }),
//     hobbies: z
//       .array(
//         z.object({
//           name: z.string().min(1, "Hobby name is required"),
//           years: z.number().min(1, "Must be at least 1 year"),
//         })
//       )
//       .min(1, "At least one hobby is required"),
//     startDate: z.date(),
//     subscribe: z.boolean(),
//     referral: z.string().default(""),
//   });
  


const HookForm = () => {
  const {register,formState:{errors,isSubmitting},control,getValues,handleSubmit,setError}  =useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            age: 18,
            gender: undefined,
            address: { city: "", state: "" },
            hobbies: [{ name: "" }],
            startDate: new Date(),
            subscribe: false,
            referral: "",
          },
        //   resolver: zodResolver(formSchema),
    })

   const{fields,append,remove}= useFieldArray({
        control,
        name:'hobbies'
    })

    // const onSubmit = async (data) => {
    //     // setError("");
    //     try {
    //       const response = await simulatedApi(data);
    //       console.log("Success:", response);
    //       // Handle success (e.g., show a success message, redirect, etc.)
    //     } catch (error) {
    //       console.error("Error:", error);
    //       setError("root", {
    //         message: error.message,
    //       });
    //     }
    //   };
    async function onSubmit(data){
        //API CALL STIMULATE
        try{
        await new Promise((resolve)=>setTimeout(resolve,5000));
        console.log("submitting form data",data)
        }catch(error){
            console.log("error:",error)
               setError("root", {
         message: error.message,
          });
       }
        }
      
      
  return (
    <div>
          <div>
                  <form 
                  onSubmit={handleSubmit(onSubmit)} 
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div>
                      <label>First Name</label>
                      <input 
                      {...register("firstName",
                        {
                          required:"First Name is required"  
                        }
                      )} />
                      {errors.firstName && <p style={{ color: "orangered" }}>{errors.firstName.message}</p>}
                    </div>
              
                    <div>
                      <label>Last Name</label>
                      <input 
                        {...register("lastName",
                            {
                              required:"Last Name is required"  
                            }
                          )}
                   />
                      {errors.lastName && <p style={{ color: "orangered" }}>{errors.lastName.message}</p>}
                    </div>
              
                    <div>
                      <label>Email</label>
                      <input 
                     {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                      })}
                       />
                      {errors.email && <p style={{ color: "orangered" }}>{errors.email.message}</p>}
                    </div>
              
                    <div>
                      <label>Age</label>
                      <input 
                   type="number"
                   {...register("age", {
                     required: "Age is required",
                     min: { value: 18, message: "You must be at least 18 years old" },
                   })} />
                      {errors.age && <p style={{ color: "orangered" }}>{errors.age.message}</p>}
                    </div>
              
                    <div>
                      <label>Gender</label>
                      <select 
                      {...register("gender", { required: "Gender is required" })}
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p style={{ color: "orangered" }}>{errors.gender.message}</p>}
                    </div>
              
                    <div>
                      <label>Address</label>
                      <input
                      {...register("address.city",{required:"City is required"})}
                        placeholder="City"
                      />
                      {errors.address?.city && <p style={{ color: "orangered" }}>{errors.address.city.message}</p>}
              
                      <input
               {...register("address.state",{reuired:"State is required"})}
                        placeholder="State"
                      />
                      {errors.address?.state && <p style={{ color: "orangered" }}>{errors.address.state.message}</p>}
                    </div>
              
                    <div>
                      <label>Start Date</label>
                      <Controller
        control={control}
        name="startDate"
        render={({ field }) => (
          <DatePicker
          onChange={(date) => field.onChange(date)}
          
            selected={field.value}
          />
        )}
      />
                    </div>
              
                    <div>
                      <label>Hobbies</label>
                      {fields.map((hobby, index) => (
                        <div key={hobby.id}>
                          <input
                            {...register(`hobbies.${index}.name`,{
                                required:"Hobby name is required",
                            })}
                            placeholder="Hobby Name"
                          />
                          {errors.hobbies?.[index]?.name && (
                            <p style={{ color: "orangered" }}>{errors.hobbies[index].name.message}</p>
                          )}
              
                          {fields.length > 1 && (
                            <button type="button" onClick={() => remove(index)}>
                              Remove Hobby
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={()=>append({name:""})}>
                        Add Hobby
                      </button>
                    </div>
              
                    <div>
                      <label htmlFor="sub">Subscribe to Newsletter</label>
                      <input
                        type="checkbox"
                        {...register("subscribe")} 
                        id="sub"
                      />
                    </div>
              
                    {getValues("subscribe") && (
                      <div>
                        <label>Referral Source</label>
                        <input
                       
                          {...register("referral",{
                            required:"Referral source is required if subscribing"
                        })}
                          placeholder="How did you hear about us?"
                        />
                        {errors.referral && <p style={{ color: "orangered" }}>{errors.referral.message}</p>}
                      </div>
                    )}
              
                    {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
              
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
            
          </div>
    </div>
  )
}

export default HookForm
