import { userInfo } from "../signals/Signals";
import { TrimEmail } from "../utility/Utility";

export default function SuccessPayment() {
  return (
    <div className="text-black w-screen h-screen flex items-center justify-center max-md:text-sm max-sm:text-xs">
      <div className="m-4 p-6 rounded-lg shadow-md shadow-gray-300 flex flex-col items-center justify-center gap-10">
        <img
          src="../imgs/thanks.avif"
          alt="thanks"
          className="w-80 h-44 max-md:w-60 max-md:h-32"
        />
        <p className="text-center w-96 max-md:w-80 max-sm:w-5/6">
          <strong>
            {TrimEmail(userInfo.value?.email ? userInfo.value.email : "")}
          </strong>
          , nous vous remercions pour votre achat sur notre site ! Nous
          apprécions votre confiance et sommes ravis de vous avoir parmi nos
          clients. <br />
          <br />
          <p>
            Aucun prélèvement ne sera effectué et aucun email ne sera envoyé, ce
            site est un projet d'entrainement et ne garde aucune trace de vos
            données.
          </p>
        </p>
      </div>
    </div>
  );
}
