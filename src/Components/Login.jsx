import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      const token = data.token;

      // Nota: En un entorno real usarías localStorage
      // localStorage.setItem('token', token);

      onLogin();

    } catch (err) {
      setError(err.message);
      console.error('Error de autenticación:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Panel izquierdo - Imagen y texto de bienvenida */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10 text-center max-w-md">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  ¡Bienvenido!
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Inicia sesión para acceder a la página de seguridad.
                </p>
                
                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                  <div className="w-8 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Panel derecho - Formulario */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                
                {/* Header del formulario */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Iniciar sesión 🔑
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Introduce tus credenciales para continuar.
                  </p>
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                {/* Formulario */}
                <div onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Campo Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        placeholder="ejemplo@correo.com"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>

                  {/* Campo Contraseña */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        placeholder="••••••••"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>

                  {/* Recordar Contraseña */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <label htmlFor="remember" className="ml-2 text-gray-600 dark:text-gray-400">
                        Recuérdame
                      </label>
                    </div>
                  </div>

                  {/* Botón de Login */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-3 px-4 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform"
                  >
                    Iniciar sesión
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;