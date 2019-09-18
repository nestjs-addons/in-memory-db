export interface NgAddOptions {
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;

  /**
   * The path to insert the controller declaration.
   */
  module?: Path;
}
