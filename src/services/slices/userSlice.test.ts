import reducer, {
  userRegister,
  loginUser,
  logoutUser,
  getUser,
  changeUserInfo
} from './userSlice';

import { TUser } from '@utils-types';
import { TAuthResponse } from '@api';

// Мокаем side effects
jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {})
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const mockAuthPayload: TAuthResponse = {
  success: true,
  accessToken: 'accessToken123',
  refreshToken: 'refreshToken123',
  user: mockUser
};

let baseState = {
  data: null,
  isAuthChecked: false
};

beforeEach(() => {
  baseState = {
    data: null,
    isAuthChecked: false
  };
  localStorage.clear();
  jest.clearAllMocks();
});

describe('userSlice — userRegister.fulfilled', () => {
  it('Пользователь зарегистрирован', () => {
    const action = {
      type: userRegister.fulfilled.type,
      payload: mockAuthPayload
    };

    const nextState = reducer(baseState, action);

    expect(nextState.data).toEqual(mockUser);
    expect(localStorage.getItem('refreshToken')).toBe('refreshToken123');
  });
});

describe('userSlice — userRegister.rejected', () => {
  it('Ошибка регистрации', () => {
    const action = {
      type: userRegister.rejected.type
    };

    const nextState = reducer({ ...baseState, data: mockUser }, action);

    expect(nextState.data).toBeNull();
  });
});

describe('userSlice — getUser.fulfilled', () => {
  it('Пользователь получен', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const nextState = reducer(baseState, action);

    expect(nextState.data).toEqual(mockUser);
    expect(nextState.isAuthChecked).toBe(true);
  });
});

describe('userSlice — getUser.rejected', () => {
  it('Ошибка получения пользователя', () => {
    const action = {
      type: getUser.rejected.type
    };

    const nextState = reducer({ ...baseState, data: mockUser }, action);

    expect(nextState.data).toBeNull();
    expect(nextState.isAuthChecked).toBe(true);
  });
});

describe('userSlice — loginUser.fulfilled', () => {
  it('Пользователь залогинен', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockAuthPayload
    };

    const nextState = reducer(baseState, action);

    expect(nextState.data).toEqual(mockUser);
    expect(localStorage.getItem('refreshToken')).toBe('refreshToken123');
  });
});

describe('userSlice — logoutUser.rejected', () => {
  it('Пользователь разлогинен', () => {
    const action = {
      type: logoutUser.rejected.type
    };

    const nextState = reducer({ ...baseState, data: mockUser }, action);

    expect(nextState.data).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});

describe('userSlice — changeUserInfo.fulfilled', () => {
  it('Информация о пользователе обновлена', () => {
    const newUser = { ...mockUser, name: 'New Name' };
    const action = {
      type: changeUserInfo.fulfilled.type,
      payload: { user: newUser }
    };

    const nextState = reducer(baseState, action);

    expect(nextState.data).toEqual(newUser);
  });
});
