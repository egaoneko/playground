import util from '../../../../src/pg/utils';

describe('util', function () {
  it('util image', function () {
    expect('image' in util).to.be(true);
  });
});
