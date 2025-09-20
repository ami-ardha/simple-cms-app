import { CE_LoginForm } from '@/features/AuthByCredentials';
import RotatingText from '@/shared/ui/RotateText';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="order-1 flex w-full items-center justify-center p-8 lg:order-2 lg:w-1/3">
        <div className="w-full max-w-sm">
          <CE_LoginForm />
        </div>
      </div>

      <div className="bg-primary-base order-2 flex w-full flex-grow items-center justify-center p-8 lg:order-1 lg:w-2/3">
        <div className="flex flex-col items-center space-y-3 text-center font-black text-white uppercase sm:space-y-5">
          <div className="text-4xl whitespace-nowrap sm:text-5xl lg:text-6xl">
            Build Your
          </div>
          <div className="text-4xl whitespace-nowrap sm:text-5xl lg:text-6xl">
            Dream CMS With
          </div>
          <div className="flex flex-row">
            <RotatingText
              texts={['Superior', 'Precision', 'Empathetic Mind', 'Creativity']}
              mainClassName="px-2 sm:px-3 bg-secondary-base text-3xl sm:text-4xl lg:text-5xl text-primary-base font-black overflow-hidden py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={'last'}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 400,
              }}
              rotationInterval={2000}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
