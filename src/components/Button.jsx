function Button({name="Click Me", type="primary", textSize="text-base", padding="py-2 px-4", font="font-normal"}){
  let bgColor, textColor;

  switch (type) {
    case "primary":
      bgColor = "bg-[var(--secondary-color)]";
      textColor = "text-white";
      break;
    case "secondary":
      bgColor = "bg-[var(--primary-color)]";
      textColor = "text-white";
      break;
    case "danger":
      bgColor = "bg-red-500";
      textColor = "text-white";
      break;
    default:
      bgColor = "bg-black";
      textColor = "text-white";
  }

  return (
    <button
    className={`${bgColor} ${textColor} ${textSize} ${padding} ${font} rounded-lg transition cursor-pointer`}>
      {name}
    </button>
  );
}

export default Button;