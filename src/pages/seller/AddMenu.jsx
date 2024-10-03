import { useForm, Controller } from "react-hook-form";
const AddMenu = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    ;
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-cyan-200 text-3xl font-normal font-['Inter'] capitalize tracking-tight">
          menu form
        </div>
        <div className="p-10">
          <div className="flex gap-10">
            <div>
              <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
                Product Name
              </div>
              <Controller
                name="productName"
                control={control}
                defaultValue=""
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[20rem] rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              {errors.productName && (
                <p className="text-red-500">{errors.productName.message}</p>
              )}
            </div>
            <div>
              <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
                Category
              </div>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[20rem] rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
                Currency
              </div>
              <Controller
                name="currency"
                control={control}
                defaultValue=""
                rules={{ required: "Currency is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-[20rem] rounded-lg outline-none border-2 p-2 px-4 border-sky-950"
                  >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                  </select>
                )}
              />
              {errors.currency && (
                <p className="text-red-500">{errors.currency.message}</p>
              )}
            </div>
            <div>
              <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
                Quantity
              </div>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[20rem] rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              {errors.quantity && (
                <p className="text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>
          <div>
            <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
              Price
            </div>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-[20rem] rounded-lg outline-none border-2 p-2 border-sky-950"
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div>
            <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
              Description
            </div>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-[20rem] rounded-lg outline-none border-2 p-2 border-sky-950"
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mt-10">
            <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
              Item in Stock
            </div>
            <div className="flex items-center text-sky-900 gap-5">
              <Controller
                name="itemInStock"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="radio"
                    {...field}
                    className="rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              <p className="text-[1.3rem]">Yes</p>
            </div>
            <div className="flex items-center text-sky-900 gap-5">
              <Controller
                name="itemInStock"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="radio"
                    {...field}
                    className="rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              <p className="text-[1.3rem]">No</p>
            </div>
          </div>
          <div className="mt-10">
            <div className="text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
              Delivery Charges
            </div>
            <div className="flex items-center text-sky-900 gap-5">
              <Controller
                name="deliveryCharges"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="radio"
                    {...field}
                    className="rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              <p className="text-[1.3rem]">Free</p>
            </div>
            <div className="flex items-center text-sky-900 gap-5">
              <Controller
                name="deliveryCharges"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="radio"
                    {...field}
                    className="rounded-lg outline-none border-2 p-2 border-sky-950"
                  />
                )}
              />
              <p className="text-[1.3rem]">Add Charges</p>
            </div>
          </div>
          <select
            name="currencySelect"
            ref={control}
            className="w-[10rem] mt-5 rounded-lg outline-none border-2 p-2 px-4 border-sky-950"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
          <div className="mt-5 text-sky-900 text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            Item Image
          </div>
          <div className="">
            <input type="file" />
          </div>
          <div className="mt-10 flex justify-evenly">
            <button
              type="submit"
              className="w-[10rem] border border-[#022859] text-[#022859] font-normal h-10 flex justify-center items-center rounded-lg"
            >
              Save
            </button>
            <button className="w-[10rem] border bg-[#022859] text-white font-normal h-10 flex justify-center items-center rounded-lg">
              Save and Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
