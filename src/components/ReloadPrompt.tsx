// src/components/ReloadPrompt.tsx
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // Adicione os tipos explícitos para 'r' e 'error'
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('Service Worker registrado:', r);
    },
    onRegisterError(error: any) {
      console.log('Erro no registro do Service Worker:', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (offlineReady || needRefresh) {
    return (
      <div style={{
        padding: '12px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        textAlign: 'left',
      }}>
        <div style={{ marginBottom: '8px' }}>
          {offlineReady ? (
            <span>App pronto para funcionar offline!</span>
          ) : (
            <span>Nova versão disponível, clique em "Recarregar" para atualizar.</span>
          )}
        </div>
        {needRefresh && (
          <button
            onClick={() => updateServiceWorker(true)}
            style={{ marginRight: '8px', padding: '8px 12px', cursor: 'pointer' }}
          >
            Recarregar
          </button>
        )}
        <button
          onClick={() => close()}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Fechar
        </button>
      </div>
    );
  }

  return null;
}

export default ReloadPrompt;