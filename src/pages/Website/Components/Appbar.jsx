import { Dropdown } from "primereact/dropdown";
import "./Appbar.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function WebAppbar() {
    let navigate = useNavigate()
    const [selectcountry, setSelectCountry] = useState()
    const [selectedCountry, setSelectedCountry] = useState({ name: 'Germany', code: 'DE', flag: 'https://flagcdn.com/de.svg' })
    const countries = [
        { name: 'United States', code: 'US', flag: 'https://flagcdn.com/us.svg' },
        { name: 'Germany', code: 'DE', flag: 'https://flagcdn.com/de.svg' },
        { name: 'France', code: 'FR', flag: 'https://flagcdn.com/fr.svg' },
        // Add more countries as needed
    ];
    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={option.flag}
                    style={{ width: '20px', marginRight: '8px' }}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex bg-main-color items-center">
                    <div className="w-[30px] h-[30px] mr-2 rounded-full overflow-hidden ">
                        <img
                            alt={option.name}
                            src={option.flag}
                            className="object-cover w-full h-full "
                        />
                    </div>
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    return (
        <div className="w-full flex flex-wrap flex-row justify-center items-center bg-main-color">
            <div className="w-full mainappbar max-w-[1500px] bg-main-color pl-4 pr-4 font-poppins h-[70px] flex flex-wrap flex-row justify-between items-center">
                <div className="flex flex-wrap items-center flex-row justify-left gap-4">
                    <i className="text-[#F1E9FE] pi pi-bars text-[24px]" />
                    <img className="h-[55px] w-[auto]" src="/FooterLogo.png" />
                </div>
                <div className="flex flx-wrap flex-row gap-4 text-[#F1E9FE] justify-between items-center">
                    <Dropdown

                        options={[{ label: "Become A Seller" }, { label: "Become A Rider" }]}
                        optionLabel="label"
                        optionValue="value"
                        onChange={() => {
                            navigate("/Login")
                        }}
                        className="text-[#F1E9FE] bg-main-color" placeholder="Become Partner" />
                    <p className="hidden md:block">Help</p>
                    <div className="border hidden md:block border-[#F1E9FE] ">
                        <Dropdown
                            value={selectedCountry}

                            style={{ color: "#F1E9FE" }}
                            options={countries}
                            onChange={(e) => setSelectedCountry(e.value)}
                            optionLabel="name"
                            placeholder="Select a Country"
                            itemTemplate={countryOptionTemplate}
                            valueTemplate={selectedCountryTemplate}
                            className="w-full bg-main-color md:w-14rem"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}