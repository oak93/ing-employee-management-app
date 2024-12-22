import { Route } from '@vaadin/router';
import { EmployeeForm } from '../pages/form';

export const routes: Route[] = [
  {
    path: '/',
    component: 'employee-list',
    action: async () => {
      await import('../pages/list');
    },
  },
  {
    path: '/employee/create',
    component: 'employee-form',
    action: async () => {
      await import('../pages/form');
    },
  },
  {
    path: '/employee/update/:id',
    component: 'employee-form',
    action: async (context) => {
      await import('../pages/form');

      const element = document.createElement('employee-form') as EmployeeForm;
      element.employeeId = Number(context.params.id);
      return element;
    },
  },
  {
    path: '(.*)',
    action: async () => {
      window.location.href = '/';
    },
  },
];
