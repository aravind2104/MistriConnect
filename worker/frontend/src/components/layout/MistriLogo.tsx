
interface MistriLogoProps {
    small?: boolean;
  }
  
  export const MistriLogo = ({ small = false }: MistriLogoProps) => {
    return (
      <div className="flex items-center">
        <div className={`font-bold ${small ? 'text-lg' : 'text-2xl'}`}>
          <span className="text-blue-600">Mistri</span>
          <span className="text-gray-800">Connect</span>
        </div>
        <div className={`ml-1 bg-blue-600 rounded-full ${small ? 'h-2 w-2' : 'h-3 w-3'}`}></div>
      </div>
    );
  };
