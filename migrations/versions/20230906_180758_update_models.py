"""update models


Revision ID: fe6690ab1441
Revises: d1426abed5b8
Create Date: 2023-09-06 18:07:58.472437

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe6690ab1441'
down_revision = 'd1426abed5b8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('artists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('classification_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'classifications', ['classification_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('artists', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('classification_id')

    # ### end Alembic commands ###