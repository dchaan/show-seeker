"""remove nullable api_id

Revision ID: d1339f53abff
Revises: de03e03fa23e
Create Date: 2023-10-04 10:05:26.400617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1339f53abff'
down_revision = 'de03e03fa23e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('artists', schema=None) as batch_op:
        batch_op.alter_column('api_id',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.alter_column('api_id',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    with op.batch_alter_table('venues', schema=None) as batch_op:
        batch_op.alter_column('api_id',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('venues', schema=None) as batch_op:
        batch_op.alter_column('api_id',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.alter_column('api_id',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    with op.batch_alter_table('artists', schema=None) as batch_op:
        batch_op.alter_column('api_id',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###
