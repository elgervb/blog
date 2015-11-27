/* global module, describe, it, expect, beforeEach, inject */
describe('Unit tests for messagebox directive', () => {
  let $compile, $rootScope, $document;

  beforeEach(module('SystemSettings'));

  beforeEach(inject((_$compile_, _$rootScope_, _$document_, $httpBackend) => {
    $httpBackend.whenPOST().respond(200, {status: 'success'});
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
  }));
  
  it('should not show an error when not set', () => {
    // Compile a piece of HTML containing the directive
    $rootScope.error = '';
    let element = $compile('<messagebox msg="error"></messagebox>')($rootScope);
    $rootScope.$digest();
    
    expect(element.find('p').text()).toBe(''); // no error shown
  });
  
  it('should have a default title', () => {
    // Compile a piece of HTML containing the directive
    $rootScope.error = 'msxboxerror';
    let element = $compile('<messagebox msg="error"></messagebox>')($rootScope);
    $rootScope.$digest();
    
    expect(element.find('h4').text()).toBe('Error');
  });
  
  it('should show a title', () => {
    // Compile a piece of HTML containing the directive
    $rootScope.error = 'msxboxerror';
    $rootScope.title = 'errorz';
    let element = $compile('<messagebox msg="error" title="title"></messagebox>')($rootScope);
    $rootScope.$digest();
    
    expect(element.find('p').text()).toContain('msxboxerror');
    expect(element.find('h4').text()).toContain('errorz');
  });
  

  it('should show an error', () => {
    // Compile a piece of HTML containing the directive
    $rootScope.error = 'msxboxerror';
    let element = $compile('<messagebox msg="error"></messagebox>')($rootScope);
    $rootScope.$digest();

    expect(element.find('p').text()).toContain('msxboxerror');
  });
  
  it('should close the messagebox', () => {
    // Compile a piece of HTML containing the directive
    $rootScope.error = 'msxboxerror';
    let element = $compile('<messagebox msg="error"></messagebox>')($rootScope);
    $rootScope.$digest();

    element.find('button').triggerHandler('click');

    expect(element.find('p').text()).toBe('');
  });
  
  it('should close on ESC key', () => {
    let event = document.createEvent('Events');
    event.initEvent('keyup');
    event.keyCode = 27;
    // Compile a piece of HTML containing the directive
    let scope = $rootScope.$new();
    scope.error = 'msgboxerror';
    let element = $compile('<messagebox msg="error"></messagebox>')(scope);
    scope.$digest();
    
    $document.triggerHandler(event);
    
    expect(element.find('p').text()).toBe('');
  });
  
  it('should $destroy', () => {
    let event = document.createEvent('Events');
    event.initEvent('keyup');
    event.keyCode = 27;
    // Compile a piece of HTML containing the directive
    let scope = $rootScope.$new();
    scope.error = 'msgboxerror';
    let element = $compile('<messagebox msg="error"></messagebox>')(scope);
    scope.$digest();
    
    $document.triggerHandler(event);
    
    scope.$destroy();
    
    expect(element.find('p').text()).toBe(''); // should be empty when destroyed...
  });
  
});
