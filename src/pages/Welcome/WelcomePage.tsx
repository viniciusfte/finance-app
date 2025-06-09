import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import financeImage from '../../assets/images/loginImage.png';

export default function WelcomePage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-shrink-0">
        <img
          src={financeImage}
          alt="Pessoa sentada em uma pilha de moedas"
          className="w-full h-auto object-cover max-h-[50vh]"
        />
      </div>

      <div className="flex flex-col flex-grow justify-between p-8 bg-gray-900 text-white rounded-t-3xl -mt-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Gerencie suas finanças com facilidade
          </h1>
          <p className="text-md text-gray-300">
            Acompanhe seus gastos, defina metas de economia e controle seu
            dinheiro.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link to="/register">
            <Button
              size="lg"
              className="w-full font-bold text-lg rounded-full"
            >
              Começar
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg rounded-full"
            >
              Já tenho uma conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}